"use strict";

const request = require("supertest");

const db = require("../db");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  adminToken
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /jobs */

describe("POST /jobs", function () {
  const newJob = {
    title: "new",
    salary: 2,
    equity: 1,
    company_handle: "c1"
  };

  test("ok for admin", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send(newJob)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      job: {
        id: expect.any(Number),
        title: "new",
        salary: 2,
        equity: "1",
        company_handle: "c1"
      },
    });
  });

  test("not ok for users", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send(newJob)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send({
          title: "new",
          salary: 10,
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send({
          ...newJob,
          company_handle: "not-a-handle",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /jobs */

describe("GET /jobs", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get("/jobs");
    expect(resp.body).toEqual({
      jobs:
          [
            {
              title: "job",
              salary: 1,
              equity: "0",
              company_handle: "c1"
            },
            {
                title: "job2",
                salary: 2,
                equity: "1",
                company_handle: "c2"
            }
          ],
    });
  });

  test("fails: test next() handler", async function () {
    // there's no normal failure event which will cause this route to fail ---
    // thus making it hard to test that the error-handler works with it. This
    // should cause an error, all right :)
    await db.query("DROP TABLE jobs CASCADE");
    const resp = await request(app)
        .get("/jobs")
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(500);
  });

  test('title query', async function () {
    const resp = await request(app).get(`/jobs?title=job`);
    expect(resp.body).toEqual({
      jobs: [
        {
          title: "job",
          salary: 1,
          equity: "0",
          company_handle: "c1"
        },
        {
            title: "job2",
            salary: 2,
            equity: "1",
            company_handle: "c2"
        }
      ] 
    })
  })

  test('minSalary query', async function () {
    const resp = await request(app).get(`/jobs?minSalary=2`);
    expect(resp.body).toEqual({
      jobs: [
        {
          title: "job2",
          salary: 2,
          equity: "1",
          company_handle: "c2"
        }
      ] 
    })
  })

  test('hasEquity query', async function () {
    const resp = await request(app).get(`/jobs?hasEquity=true`);
    expect(resp.body).toEqual({
      jobs: [
        {
          title: "job2",
          salary: 2,
          equity: "1",
          company_handle: "c2"
        }
      ] 
    })
  })

  test('throws 404 error', async function () {
    const resp = await request(app).get(`/jobs?minSalary=3`);
    expect(resp.statusCode).toBe(404)
  })
});

/************************************** GET /jobs/:title */

describe("GET /jobs/:title", function () {
  test("works for anon", async function () {
    const resp = await request(app).get(`/jobs/job2`);
    expect(resp.body).toEqual({
      job: [{
        title: "job2",
        salary: 2,
        equity: "1",
        company_handle: "c2"
      }],
    });
  });

  test("not found for no such job", async function () {
    const resp = await request(app).get(`/jobs/nope`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /jobs/:handle/:title */

describe("PATCH /jobs/:handle/:title", function () {
  test("works for admin", async function () {
    const resp = await request(app)
        .patch(`/jobs/c1/job`)
        .send({
          title: "job-new",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
      job: {
        title: "job-new",
        salary: 1,
        equity: "0",
        companyHandle: "c1"
      },
    });
  });

  test("doesn't work for users", async function () {
    const resp = await request(app)
        .patch(`/jobs/c1/job`)
        .send({
          title: "job-new",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toBe(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .patch(`/jobs/c1/job`)
        .send({
          title: "job-new",
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("not found or no such job", async function () {
    const resp = await request(app)
        .patch(`/jobs/c1/nope`)
        .send({
          title: "new nope",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("bad request on id change attempt", async function () {
    const resp = await request(app)
        .patch(`/jobs/c1/job`)
        .send({
          id: 1,
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request on invalid data", async function () {
    const resp = await request(app)
        .patch(`/jobs/c1/job`)
        .send({
          salary: "not-a-number",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** DELETE /companies/:handle */

describe("DELETE /jobs/:handle/:title", function () {
  test("works for admin", async function () {
    const resp = await request(app)
        .delete(`/jobs/c1/job`)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({ deleted: "job at c1" });
  });

  test("doesn't work for users", async function () {
    const resp = await request(app)
        .delete(`/jobs/c1/job`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toBe(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .delete(`/jobs/c1/job`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such job", async function () {
    const resp = await request(app)
        .delete(`/jobs/c1/nope`)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });
});
