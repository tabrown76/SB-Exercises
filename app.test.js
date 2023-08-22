process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('./app');
const items = require('./fakeDb');

let item = {name: 'popsicle', price: 1.45};

beforeEach(function(){
    items.push(item);
})

afterEach(function(){
    items.length = 0;   
})

describe("GET /items", () =>{
    test("get all items", async () =>{
       const res = await request(app).get("/items");
       expect(res.statusCode).toBe(200);
       expect(res.body).toEqual({items: [item]});
    })
})

describe("GET /item/:name", () =>{
    test("get item", async () =>{
       const res = await request(app).get(`/items/${item.name}`);
       expect(res.statusCode).toBe(200);
       expect(res.body).toEqual({item: item});
    })
    test("responds with 404 for invalid name", async () =>{
        const res = await request(app).get('/items/cheerios');
        expect(res.statusCode).toBe(404);
    })
})

describe("POST /cats", () =>{
    test("create item", async () => {
        const res = await request(app).post("/items").send({name: 'cheerios', price: 3.40});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            item: {name: 'cheerios', price: 3.40},
            message: 'Added: cheerios'
        });
    })
    test("responds with 403 for missing name", async () => {
        const res = await request(app).post("/items").send({name: '', price: 3.40});
        expect(res.statusCode).toBe(403);
    })
    test("responds with 403 for missing price", async () => {
        const res = await request(app).post("/items").send({name: 'cheerios', price: ''});
        expect(res.statusCode).toBe(403);
    })
})

describe("PATCH /items/:name", () => {
    test("update popsicle", async () => {
        const res = await request(app).patch(`/items/${item.name}`).send({name: 'pushpops', price: 2.00});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            item: {name: 'pushpops', price: 2.00},
            message: 'Updated: pushpops'
        });
    })
    test("responds with 404 for invalid name", async () => {
        const res = await request(app).patch(`/items/cheerios`).send({name: 'pushpops', price: 2.00});
        expect(res.statusCode).toBe(404);
    })
})

describe("DELETE /items/:name", () => {
    test("delete popsicle", async () => {
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: 'Deleted'});
    })
    test("responds with 404 for invalid name", async () => {
        const res = await request(app).delete('/items/cheerios');
        expect(res.statusCode).toBe(404);
    })
})