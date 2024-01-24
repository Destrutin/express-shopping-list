const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const items = require('../fakeDb');

router.get('/', function (req, res) {
    try {
        res.json({items});
    } catch (e) {
        return next(e);
    }
})

router.post('/', function (req, res, next) {
    try {
        if(!req.body) throw new ExpressError('Item is required', 400);
        const newItem = req.body;
        items.push(newItem);
        res.json({item: newItem});
    } catch (e) {
        return next(e);
    }
})

router.get('/:name', function (req, res, next) {
    try {
        const gottenItem = items.find(item => item.name === req.params.name);
        if (gottenItem) {
            res.json({item: gottenItem});
        } else {
            throw new ExpressError('Item not found', 404);
        }
    } catch (e) {
        return next(e)
    }
        
})

router.patch('/:name', function (req, res) {
    try {
        const index = items.findIndex(item => item.name === req.params.name);
        if (index !== -1) {
            items[index].name = req.body.name;
            items[index].price = req.body.price;
            res.json({item: items[index]});
        } else {
            throw new ExpressError('Item not found', 404);
        }
    } catch (e) {
        return next(e);
    }
})

router.delete('/:name', function (req, res) {
    try {
        const index = items.findIndex(item => item.name === req.params.name);
        if (index !== -1) {
            items.splice(index, 1);
            res.json({message: 'Deleted'});
    } else {
        throw new ExpressError('Item not found', 404);
    }
    } catch (e) {
        return next(e);
    }
    
})

module.exports = router;