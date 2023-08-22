const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');
const ExpressError = require('./errors');

// const ITEMS = [
//     {name: 'popsicle', price: 1.45},
//     {name: 'cheerios', price: 3.40}
// ]

router.get('/', (req, res, next) => {
    try {
        res.json({items: items});
    } catch(err){
        next(err);
    }
})

router.get('/:name', (req, res, next) => {
    try {
        const item = items.find(item => item.name === req.params.name);
        if(!item) throw new ExpressError('Item not found', 404);
        res.json({item});
    } catch(err) {
        next(err);
    }
})

router.post('/', (req, res, next) => {
    try {
        if(!req.body.name) throw new ExpressError('Name required', 403);
        if(!req.body.price) throw new ExpressError('Price required', 403);
        const newItem = {name: req.body.name, price: req.body.price};
        items.push(newItem);
        res.status(201).json({message: `Added: ${newItem.name}`, item: newItem});
    } catch(err) {
        next(err);
    }
})

router.patch('/:name', (req, res, next) => {
    try {
        const foundItem = items.find(item => item.name === req.params.name);
        if(!foundItem) throw new ExpressError('Item not found', 404);
        if(req.body.name){
            foundItem.name = req.body.name;
        }
        if(req.body.price){
            foundItem.price = req.body.price;
        }
        res.json({message: `Updated: ${foundItem.name}`, item: foundItem});
    } catch(err) {
        next(err);
    }
})

router.delete('/:name', (req, res, next) => {
    try {
        const foundItem = items.findIndex(item => item.name === req.params.name);
        if(foundItem === -1) throw new ExpressError('Item not found', 404);
        items.splice(foundItem, 1);
        res.json({message: 'Deleted'});
    } catch(err) {
        next(err);
    }
})

module.exports = router;