const express = require('express')
const router = express.Router();
const Mandat = require('../models/mandat.model');

// Retrieve all mandats
router.get('/', (req, res) => {
    res.send({ message: 'Api working' })
})

// Retrieve one mandat
router.get('/:id', (req, res) => {
    res.send({ message: req.params.id })
})

// Add mandat
router.post('/', (req, res) => {
    const mandat = req.body;
    res.json(mandat)
})

// Update mandat
router.patch('/:id', (req, res) => {
    res.send({ message: req.params.id })
})

//  Delete mandat
router.delete('/:id', (req, res) => {
    res.send({ message : req.params.id})
})
module.exports = router;