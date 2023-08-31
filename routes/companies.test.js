process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');
const slugify = require('slugify');

let testCompany;
let testCompany2 = {
    code: 'tc2',
    name: 'TC2',
    description: 'test company'
};

beforeEach(async() => {
    const result = await db.query(
        `INSERT INTO companies VALUES ('apple', 'Apple Computer', 'Maker of OSX.') RETURNING *`
    );
    testCompany = result.rows[0];
})

afterEach(async() => {
    await db.query(`DELETE FROM companies`);
    await db.query(`DELETE FROM invoices`);
    await db.query(`DELETE FROM industries`);
})

afterAll(async() => {
    await db.end();
})

describe('GET /companies', () => {
    test('get all companies', async () =>{
        const res = await request(app).get('/companies');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({companies: [{code: testCompany.code, name: testCompany.name}]});
    })
})

describe('GET /companies/:code', () => {
    test('get one company by code', async () => {
        const res = await request(app).get(`/companies/${testCompany.code}`);
        expect(res.statusCode).toBe(200);
    })
    test('Responds with 404', async () => {
        const res = await request(app).get(`/companies/asdf`);
        expect(res.statusCode).toBe(404);
    })
})

describe('POST /companies', () => {
    test('add company', async () => {
        const res = await request(app).post(`/companies`).send(testCompany2);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({company: {
            code: slugify(testCompany2.name),
            name: testCompany2.name,
            description: testCompany2.description
        }})
    })
})

describe('PUT /companies/:code', () => {
    test('update company by code', async () => {
        const res = await request(app).put(`/companies/${testCompany.code}`).send({name: 'TC1', description: 'test'});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({company: {
            name: 'TC1',
            description: 'test'
        }})
    })
    test('Responds with 404', async () => {
        const res = await request(app).put(`/companies/asdf`);
        expect(res.statusCode).toBe(404);
    })
})

describe('DELETE /companies/:code', () => {
    test('delete company by code', async () => {
        const res = await request(app).delete(`/companies/${testCompany.code}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({status: 'Deleted'});
    })
})