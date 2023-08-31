process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

let testIndustry;
let testIndustry2 = {
    code: 'lgl',
    industry: 'Legal'
};

beforeEach(async() => {
    const result = await db.query(
        `INSERT INTO industries VALUES ('acct', 'Accounting') RETURNING *`
    );
    testIndustry = result.rows[0];
})

afterEach(async() => {
    await db.query(`DELETE FROM companies`);
    await db.query(`DELETE FROM invoices`);
    await db.query(`DELETE FROM industries`);
})

afterAll(async() => {
    await db.end();
})

describe('GET /industries', () => {
    test('get all industries', async () =>{
        const res = await request(app).get('/industries');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({industries: [{code: testIndustry.code, industry: testIndustry.industry, companies: [testIndustry.companies]}]});
    })
})

describe('GET /industries/:code', () => {
    test('get one industry by code', async () => {
        const res = await request(app).get(`/industries/${testIndustry.code}`);
        expect(res.statusCode).toBe(200);
    })
    test('Responds with 404', async () => {
        const res = await request(app).get(`/industries/asdf`);
        expect(res.statusCode).toBe(404);
    })
})

describe('POST /industries', () => {
    test('add industry', async () => {
        const res = await request(app).post(`/industries`).send(testIndustry2);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({industry: testIndustry2})
    })
})

describe('PUT /industries/:code', () => {
    test('update industry by code', async () => {
        const res = await request(app).put(`/industries/${testIndustry.code}`).send({industry: 'notAccounting'});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({industry: {
            code: 'acct',
            industry: 'notAccounting'
        }})
    })
    test('Responds with 404', async () => {
        const res = await request(app).put(`/industries/asdf`);
        expect(res.statusCode).toBe(404);
    })
})

describe('DELETE /industries/:code', () => {
    test('delete industry by code', async () => {
        const res = await request(app).delete(`/industries/${testIndustry.code}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({status: 'Deleted'});
    })
})