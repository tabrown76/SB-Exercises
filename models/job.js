"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs. */

class Job {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, company_handle }
   *
   * Returns { id, title, salary, equity, company_handle }
   *
   * Throws BadRequestError if job/company combination already in database.
   * */

  static async create({ title, salary, equity, company_handle }) {
    const companyCheck = await db.query(
        `SELECT handle
        FROM companies
        WHERE handle = $1`,
        [company_handle]);

    if(!companyCheck.rows[0]) throw new BadRequestError(`Company not found: ${company_handle}`);

    const duplicateCheck = await db.query(
          `SELECT title
           FROM jobs
           WHERE title = $1 AND company_handle = $2`,
        [title, company_handle]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate job: ${title}`);
    
    const result = await db.query(
          `INSERT INTO jobs
           (title, salary, equity, company_handle)
           VALUES ($1, $2, CAST($3 AS NUMERIC), $4)
           RETURNING id, title, salary, equity, company_handle`,
        [
          title,
          salary,
          equity,
          company_handle
        ],
    );
    const job = result.rows[0];

    return job;
  }

  /** Find all jobs that match dynamically generated criteria.
   *
   * Returns [{ title, salary, equity, company_handle }, ...]
   * */

  static async findAll(filters = {}) {
    let query = `SELECT title,
                    salary,
                    equity,
                    company_handle
                 FROM jobs`;

    let whereConditions = [];
    let queryValues = [];

    // For title filtering
    if (filters.title) {
      queryValues.push(`%${filters.title}%`);
      whereConditions.push(`title ILIKE $${queryValues.length}`);
    }

    // For minSalary filtering
    if (filters.minSalary) {
        queryValues.push(parseInt(filters.minSalary));
        whereConditions.push(`salary >= $${queryValues.length}`);
    }

    //For hasEquity filtering
    if(filters.hasEquity === 'true') {
        whereConditions.push(`equity > 0`)
    }

    if (whereConditions.length > 0) {
      query += "\n WHERE " + whereConditions.join(" AND ");
    }

    query += "\n ORDER BY title";

    const companiesRes = await db.query(query, queryValues);
    return companiesRes.rows;
  }

  /** Given a job title, return data about job.
   *
   * Returns { title, salary, equity, company_handle }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(title) {
    const jobsRes = await db.query(
          `SELECT title,
                  salary,
                  equity,
                  company_handle
           FROM jobs
           WHERE title ILIKE $1`,
        [title]);

    const jobs = jobsRes.rows;

    if (jobs.length === 0) throw new NotFoundError(`No job: ${title}`);

    return jobs;
  }

  /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {title, salary, equity, company_handle}
   *
   * Returns {title, salary, equity, company_handle}
   *
   * Throws NotFoundError if not found.
   */

  static async update(title, company_handle, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
        companyHandle: "company_handle"
    });
    const titleIdx = "$" + (values.length + 1);
    const handleIdx = "$" + (values.length + 2);

    const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE title = ${titleIdx} AND company_handle = ${handleIdx}
                      RETURNING title,
                                salary,
                                equity,
                                company_handle AS "companyHandle"`;

    const result = await db.query(querySql, [...values, title, company_handle]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No ${title} at ${company_handle}`);

    return job;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(title, company_handle) {
    const result = await db.query(
          `DELETE
           FROM jobs
           WHERE title = $1 AND company_handle = $2
           RETURNING title`,
        [title, company_handle]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No ${title} at ${company_handle}`);
  }
}


module.exports = Job;
