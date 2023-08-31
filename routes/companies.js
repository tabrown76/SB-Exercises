const express = require('express');
const slugify = require('slugify');
const router = new express.Router();
const db = require('../db');
const ExpressError = require('../expressError');

router.get('/', async (req, res, next) => {
    try{
        const results = await db.query(
            'SELECT code, name FROM companies'
        );
        return res.json({companies: results.rows});
    } catch(err){
        return next(err);
    }
})

router.get('/:code', async (req, res, next) => {
    try {
        const {code} = req.params;
        const results = await db.query(
            `SELECT code, name, description, i.id AS id, i.amt AS amt, i.paid AS paid, i.add_date AS add_date, i.paid_date AS paid_date 
            FROM companies 
            LEFT JOIN invoices AS i ON companies.code=i.comp_code
            WHERE code=$1`, [code]
        )
        if(results.rows.length === 0) throw new ExpressError(`Can't find company with code ${code}`, 404);
        
        const companyInfo = {
            code: results.rows[0].code,
            name: results.rows[0].name,
            description: results.rows[0].description,
            invoices: [],
            industries: []
        }

        results.rows.forEach(row => {
            companyInfo.invoices.push({
                id: row.id,
                amt: row.amt,
                paid: row.paid,
                add_date: row.add_date,
                paid_date: row.paid_date
            })
        })

        const iResults = await db.query(
            `SELECT industry
            FROM industries
            LEFT JOIN companies_industries AS ci ON ci.industry_code=industries.code 
            WHERE company_code=$1`, [code]
        )

        iResults.rows.forEach(row => {
            companyInfo.industries.push({
                industry: row.industry
            })
        })
        return res.json({company: companyInfo});
    } catch(err) {
        return next(err);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {name, description} = req.body;
        const results = await db.query(
            `INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *`, [slugify(name), name, description]);
        return res.status(201).json({company: results.rows[0]});
        
    } catch(err) {
        return next(err);
    }
})

router.put('/:code', async (req, res, next) => {
    try {
        const {code} = req.params;
        const {name, description} = req.body;
        const results = await db.query(
            `UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING name, description`, [name, description, code]
        )
        if(results.rows.length === 0) throw new ExpressError(`Can't update company with code ${code}`, 404);
        return res.send({company: results.rows[0]});
    } catch(err) {
        return next(err);
    }
})

router.delete('/:code', async (req, res, next) => {
    try {
        const {code} = req.params;
        const results = await db.query(
            `DELETE FROM companies WHERE code=$1`, [code]
        )
        if(results.rowCount === 0) throw new ExpressError(`Can't delete company with code ${code}`, 404);
        return res.send({status: 'Deleted'});
    } catch(err) {
        return next(err);
    }
})

module.exports = router;