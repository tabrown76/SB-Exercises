const express = require('express');
const router = new express.Router();
const db = require('../db');
const ExpressError = require('../expressError');

router.get('/', async (req, res, next) => {
    try{
        const results = await db.query(
            'SELECT id, comp_code FROM invoices'
        );
        return res.json({invoices: results.rows});
    } catch(err){
        return next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const results = await db.query(
            `SELECT id, amt, paid, add_date, paid_date, companies.code AS code, companies.name AS name, companies.description AS description
            FROM invoices JOIN companies ON invoices.comp_code=companies.code WHERE id=$1`, [id]
        )
        if(results.rows.length === 0) throw new ExpressError(`Can't find invoice with id ${id}`, 404);

        const formattedResults = results.rows.map(row => {
            return {
                invoice: {
                    id: row.id,
                    amt: row.amt,
                    paid: row.paid,
                    add_date: row.add_date,
                    paid_date: row.paid_date,
                    company: {
                        code: row.code,
                        name: row.name,
                        description: row.description
                }
                }
            }
        })
        return res.json(formattedResults);
    } catch(err) {
        return next(err);
    }
})

router.post('/', async (req, res, next) =>{
    try {
        const {comp_code, amt} = req.body;
        const results = await db.query(
            `INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING *`, [comp_code, amt]);
        return res.status(201).json({invoice: results.rows[0]});        
    } catch(err) {
        return next(err);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {amt} = req.body;
        const results = await db.query(
            `UPDATE invoices SET amt=$1 WHERE id=$2 RETURNING *`, [amt, id]
        )
        if(results.rows.length === 0) throw new ExpressError(`Can't update invoice with id ${id}`, 404);
        return res.send({invoice: results.rows[0]});
    } catch(err) {
        return next(err);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const results = await db.query(
            `DELETE FROM invoices WHERE id=$1`, [id]
        )
        if(results.rowCount === 0) throw new ExpressError(`Can't delete invoice with id ${id}`, 404);
        return res.send({status: 'Deleted'});
    } catch(err) {
        return next(err);
    }
})

module.exports = router;