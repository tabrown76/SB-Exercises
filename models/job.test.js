"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  const newJob = {
    title: "new",
    salary: 2,
    equity: "0",
    company_handle: "c1"
  };

  test("works", async function () {
    let job = await Job.create(newJob);

    const result = await db.query(
          `SELECT title, salary, equity, company_handle
           FROM jobs
           WHERE title = 'new'`);
    expect(result.rows).toEqual([
      {
        title: "new",
        salary: 2,
        equity: "0",
        company_handle: "c1"
      },
    ]);
  });

  test("bad request with dupe", async function () {
    try {
      await Job.create(newJob);
      await Job.create(newJob);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let jobs = await Job.findAll();
    expect(jobs).toEqual([
      {
        title: "job",
        salary: 1,
        equity: "0",
        company_handle: 'c1'
      }
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let job = await Job.get("job");
    expect(job).toEqual([{
      title: "job",
      salary: 1,
      equity: "0",
      company_handle: "c1"
    }]);
  });

  test("not found if no such job", async function () {
    try {
      await Job.get("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
""
/************************************** update */

describe("update", function () {
  const updateData = {
    title: "another",
    salary: 3,
    equity: 1,
    company_handle: "c1"
  };

  test("works", async function () {
    let job = await Job.update("job", "c1", updateData);
    expect(job).toEqual({
        title: "another",
        salary: 3,
        equity: "1",
        companyHandle: "c1"
    });

    const result = await db.query(
          `SELECT title, salary, equity, company_handle
           FROM jobs
           WHERE company_handle = 'c1'`);
    expect(result.rows).toEqual([{
      title: "another",
      salary: 3,
      equity: "1",
      company_handle: "c1"
    }]);
  });

  test("works: null fields", async function () {
    const updateDataSetNulls = {
      title: "New",
      salary: null,
      equity: null
    };

    let job = await Job.update("job", "c1", updateDataSetNulls);
    expect(job).toEqual({
      companyHandle: "c1",
      ...updateDataSetNulls,
    });

    const result = await db.query(
          `SELECT title, salary, equity, company_handle
           FROM jobs
           WHERE company_handle = 'c1'`);
    expect(result.rows).toEqual([{
      company_handle: "c1",
      title: "New",
      salary: null,
      equity: null,
    }]);
  });

  test("not found if no such job", async function () {
    try {
      await Job.update("nope", "c1", updateData);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request with no data", async function () {
    try {
      await Job.update("job", "c1", {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Job.remove("job","c1");
    const res = await db.query(
        "SELECT company_handle FROM jobs WHERE company_handle='c1'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such company", async function () {
    try {
      await Job.remove("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
