process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

let testCompany;

beforeEach(async() => {
    const result = await db.query(
        `INSERT INTO VALUES RETURNING`
    );
    testCompany = result.rows[0];
})

afterEach(async() => {
    await db.query(`DELETE FROM`);
})

afterAll(async() => {
    await db.end();
})

describe('GET /companies', () => {
    test('', async () =>{
        const res = await request(app).get('/companies');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({companies: [testCompany]});
    })
})

describe('GET /companies/:id', () => {
    test('', async () => {
        const res = await request(app).get(`/companies/${testCompany.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({company: testCompany});
    })
    test('Responds with 404', async () => {
        const res = await request(app).get(`/companies/0`);
        expect(res.statusCode).toBe(404);
    })
})

describe('POST /companies', () => {
    test('', async () => {
        const res = await request(app).post(`/companies`).send({});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({company: {
            id: expect.any(Number),
        }})
    })
})

describe('PATCH /companies/:id', () => {
    test('', async () => {
        const res = await request(app).patch(`/companies/${testCompany.id}`).send({});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({company: {
            id: testCompany.id,
        }})
    })
    test('Responds with 404', async () => {
        const res = await request(app).patch(`/companies/0`);
        expect(res.statusCode).toBe(404);
    })
})

describe('DELETE /companies/:id', () => {
    test('', async () => {
        const res = await request(app).delete(`/companies/${testCompany.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({status: 'Deleted'});
    })
})