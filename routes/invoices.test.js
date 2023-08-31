process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

let testInvoice;
let testInvoice2 = {
    comp_code: 'notapple',
    amt: 100,
    paid: false,
    paid_date: null
};

beforeEach(async() => {
    await db.query(`INSERT INTO companies VALUES ('notapple', 'notApple Computer', 'Maker of OSX.')`);
    const result = await db.query(
        `INSERT INTO invoices (comp_code, amt, paid, paid_date) VALUES ('notapple', 100, false, null) RETURNING *`
    );
    testInvoice = result.rows[0];
})

afterEach(async() => {
    await db.query(`DELETE FROM invoices`);
    await db.query(`DELETE FROM companies`);
    await db.query(`DELETE FROM industries`);
})

afterAll(async() => {
    await db.end();
})

describe('GET /invoices', () => {
    test('get all invoices', async () =>{
        const res = await request(app).get('/invoices');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({invoices: [{id: testInvoice.id, comp_code: testInvoice.comp_code}]});
    })
})

describe('GET /invoices/:id', () => {
    test('get one invoice by id', async () => {
        const res = await request(app).get(`/invoices/${testInvoice.id}`);
        console.log('received response', res.body);
        expect(res.statusCode).toBe(200);
    })
    test('Responds with 404', async () => {
        const res = await request(app).get(`/invoices/0`);
        expect(res.statusCode).toBe(404);
    })
})

describe('POST /invoices', () => {
    test('add invoice', async () => {
        const res = await request(app).post(`/invoices`).send(testInvoice2);
        expect(res.statusCode).toBe(201);
        expect(res.body.invoice.amt).toEqual(testInvoice2.amt);
        expect(res.body.invoice.comp_code).toEqual(testInvoice2.comp_code);
    })
})

describe('PUT /invoices/:id', () => {
    test('update invoice by id with new charge', async () => {
        const res = await request(app).put(`/invoices/${testInvoice.id}`).send({amt: 1, id: testInvoice.id, paid: false});
        expect(res.statusCode).toBe(200);
        expect(res.body.invoice.amt).toEqual(101);
        expect(res.body.invoice.id).toEqual(testInvoice.id);
    })
    test('update invoice by id with new payment', async () => {
        const res = await request(app).put(`/invoices/${testInvoice.id}`).send({amt: 1, id: testInvoice.id, paid: true});
        expect(res.statusCode).toBe(200);
        expect(res.body.invoice.amt).toEqual(99);
        expect(res.body.invoice.id).toEqual(testInvoice.id);
    })
    test('Responds with 404', async () => {
        const res = await request(app).put(`/invoices/0`);
        expect(res.statusCode).toBe(404);
    })
})

describe('DELETE /invoices/:id', () => {
    test('delete invoice by id', async () => {
        const res = await request(app).delete(`/invoices/${testInvoice.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({status: 'Deleted'});
    })
})