"use strict";

/** Routes for jobs. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError, NotFoundError } = require("../expressError");
const { ensureLoggedIn, ensureAdmin } = require("../middleware/auth");
const Job = require("../models/job");

const jobNewSchema = require("../schemas/jobNew.json");
const jobUpdateSchema = require("../schemas/jobUpdate.json");
const db = require("../db");

const router = new express.Router();


/** POST / { job } =>  { job }
 *
 * job should be { title, salary, equity, company_handle }
 *
 * Returns { title, salary, equity, company_handle }
 *
 * Authorization required: login, isAdmin
 */

router.post("/", ensureLoggedIn, ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, jobNewSchema);    
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const job = await Job.create(req.body);
    return res.status(201).json({ job });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { jobs: [ { title, salary, equity, company_handle }, ...] }
 *
 * Can filter on provided search filters:
 * - title (will find case-insensitive, partial matches)
 * - minSalary
 * - hasEquity(boolean)
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  try {
    const {title, minSalary, hasEquity} = req.query;
    const filters = {title, minSalary, hasEquity};
    const jobs = await Job.findAll(filters);
    if(jobs.length === 0) throw new NotFoundError();
    return res.json({ jobs });
  } catch (err) {
    return next(err);
  }
});

/** GET /[title]  =>  { job }
 *
 *  Job is { title, salary, equity, company_handle }
 *
 * Authorization required: none
 */

router.get("/:title", async function (req, res, next) {
  try {
    const job = await Job.get(req.params.title);
    return res.json({ job });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[company_handle, title] { fld1, fld2, ... } => { job }
 *
 * Patches job data.
 *
 * fields can be: { title, salary, equity, company_handle }
 *
 * Returns { title, salary, equity, company_handle }
 *
 * Authorization required: login, isAdmin
 */

router.patch("/:handle/:title", ensureLoggedIn, ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, jobUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const job = await Job.update(req.params.title, req.params.handle, req.body);
    return res.json({ job });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[company_handle, title]  =>  { deleted: title }
 *
 * Authorization: login, isAdmin
 */

router.delete("/:handle/:title", ensureLoggedIn, ensureAdmin, async function (req, res, next) {
  try {
    await Job.remove(req.params.title, req.params.handle);
    return res.json({ deleted: `${req.params.title} at ${req.params.handle}` });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
