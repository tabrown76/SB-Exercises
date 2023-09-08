process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const db = require('../db');
const Book = require('../models/book');


describe("Book Routes Test", function () {
    let book;

    beforeEach(async function () {
      await db.query("DELETE FROM books");
  
      book = await Book.create({
        isbn: "0691161518",
        amazon_url: "http://a.co/eobPtX2",
        author: "Matthew Lane",
        language: "english",
        pages: 264,
        publisher: "Princeton University Press",
        title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        year: 2017
      });
    });

    describe("GET /books", function () {
        test("get all books", async function () {
          let res = await request(app).get("/books");
          expect(res.statusCode).toBe(200);
          expect(res.body.books.length).toBe(1);
        });
    });

    describe("GET /books/:id", function () {
        test("get one book", async function () {
          let res = await request(app).get(`/books/${book.isbn}`);
          expect(res.statusCode).toBe(200);
          expect(res.body).toEqual({book});
        });
        test("resp with 404", async function () {
            let res = await request(app).get(`/books/asdf`);
            expect(res.statusCode).toBe(404);
        })
    });

    describe("POST /books", function () {
        test("post book", async function () {
            let res = await request(app).post(`/books`).send(
                {
                    "isbn": "069116151",
                    "amazon_url": "http://a.co/eobPtX2",
                    "author": "Matthew Lane",
                    "language": "english",
                    "pages": 264,
                    "publisher": "Princeton University Press",
                    "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                    "year": 2017
                }
            );
            expect(res.statusCode).toBe(201);
            expect(res.body.book).toHaveProperty("isbn", "069116151");
        })
        test("resp with 400", async function (){
            let res = await request(app).post('/books').send({});
            expect(res.statusCode).toBe(400);
        })
    })

    describe("PUT /books/:isbn", function () {
        test("update book", async function () {
            let res = await request(app).put(`/books/${book.isbn}`).send({
                "author": "John Doe"
            })
            expect(res.statusCode).toBe(200);
            expect(res.body.book).toHaveProperty("author", "John Doe");
            expect(res.body.book).toHaveProperty("pages", null);
        })
        test("resp with 404", async function () {
            let res = await request(app).put(`/books/asdf`).send({});
            expect(res.statusCode).toBe(404);
        })
        test("resp with 400", async function () {
            let res = await request(app).put(`/books/${book.isbn}`).send({
                "author": 1234
            })
            expect(res.statusCode).toBe(400);
        })
    })

    describe("DELETE /book/isbn", function () {
        test("delete book", async function () {
            let res = await request(app).delete(`/books/${book.isbn}`);
            expect(res.statusCode).toBe(200);
        })
        test("resp with 404", async function () {
            let res = await request(app).delete(`/books/asdf`);
            expect(res.statusCode).toBe(404);
        })
    })

    describe("resp with 404", function () {
        test("resp with 404", async function () {
            let res = await request(app).get(`/asdf`);
            expect(res.statusCode).toBe(404);
        })
    })
})

afterAll(async function() {
    await db.end();
});