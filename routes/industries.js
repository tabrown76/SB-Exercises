const express = require('express');
const router = new express.Router();
const db = require('../db');
const ExpressError = require('../expressError');

router.get('/', async (req, res, next) => {
    try{
        const results = await db.query( 
            `SELECT industries.code AS industry_code, industry, ci.company_code AS company_code
            FROM industries
            LEFT JOIN companies_industries AS ci ON industries.code=ci.industry_code`
        );
        let industries = {};
        results.rows.forEach(row => {
            if(!industries[row.industry_code]){
                industries[row.industry_code] = {
                    code: row.industry_code,
                    industry: row.industry,
                    companies: []
                }
            }
            if (row.company_code) {
                industries[row.industry_code].companies.push(row.company_code);
            } 
        })
        return res.json({industries: Object.values(industries)});
    } catch(err){
        return next(err);
    }
})

router.get('/:code', async (req, res, next) => {
    try {
        const {code} = req.params;
        const results = await db.query(
            `SELECT industries.code AS industry_code, industry, ci.company_code AS company_code
            FROM industries 
            LEFT JOIN companies_industries AS ci ON industries.code=ci.industry_code
            WHERE code=$1`, [code]
        )
        if(results.rows.length === 0) throw new ExpressError(`Can't find industry with code ${code}`, 404);
        
        const industryInfo = {
            code: results.rows[0].industry_code,
            industry: results.rows[0].industry,
            companies: []
        }

        results.rows.forEach(row => {
            if(row.company_code){
                industryInfo.companies.push({
                    comp_code: row.company_code
                })
            }
        })
        return res.json({industry: industryInfo});
    } catch(err) {
        return next(err);
    }
})

router.post('/', async (req, res, next) =>{
    try {
        const {code, industry} = req.body;
        const results = await db.query(
            `INSERT INTO industries (code, industry) VALUES ($1, $2) RETURNING *`, [code, industry]);
        return res.status(201).json({industry: results.rows[0]});        
    } catch(err) {
        return next(err);
    }
})

router.post('/:industry_code', async (req, res, next) => {
    try {
        const {industry_code} = req.params;
        const {company_code} = req.body;
        const results = await db.query(
            `INSERT INTO companies_industries (industry_code, company_code) VALUES ($1, $2) RETURNING *`, [industry_code, company_code]
        );
        if(results.rows.length === 0) throw new ExpressError(`Can't update industry with code ${code}`, 404);
        return res.status(201).send({industry: results.rows[0]});               
    } catch(err) {
        return next(err);
    }
})

router.put('/:code', async (req, res, next) => {
    try {
        const {code} = req.params;
        const {industry} = req.body;
        const results = await db.query(
            `UPDATE industries SET industry=$1 WHERE code=$2 RETURNING *`, [industry, code]
        );
        if(results.rows.length === 0) throw new ExpressError(`Can't update industry with code ${code}`, 404);
        return res.send({industry: results.rows[0]});               
    } catch(err) {
        return next(err);
    }
})

router.delete('/:code', async (req, res, next) => {
    try {
        const {code} = req.params;
        const results = await db.query(
            `DELETE FROM industries WHERE code=$1`, [code]
        )
        if(results.rowCount === 0) throw new ExpressError(`Can't delete industry with code ${code}`, 404);
        return res.send({status: 'Deleted'});
    } catch(err) {
        return next(err);
    }
})

module.exports = router;