const express = require('express');
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
            `SELECT code, name, description, invoices.id AS id, invoices.amt AS amt, invoices.paid AS paid, invoices.add_date AS add_date, invoices.paid_date AS paid_date 
            FROM companies JOIN invoices on companies.code=invoices.comp_code WHERE code=$1`, [code]
        )
        if(results.rows.length === 0) throw new ExpressError(`Can't find company with code ${code}`, 404);
        
        const companyInfo = {
            code: results.rows[0].code,
            name: results.rows[0].name,
            description: results.rows[0].description,
            invoices: []
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
        return res.json({company: companyInfo});
    } catch(err) {
        return next(err);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {code, name, description} = req.body;
        const results = await db.query(
            `INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *`, [code, name, description]);
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