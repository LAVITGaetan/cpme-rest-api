const express = require('express')
const router = express.Router();
const Adherent = require('../models/adherent.model');

// Retrieve all adhérents
router.get('/', (req, res) => {
    res.send({ message: 'Api working' })
})

// Retrieve one adhérent
router.get('/:id', (req, res) => {
    res.send({ message: req.params.id })
})

// Add adhérent
router.post('/', (req, res) => {
    const adherent = req.body;
    res.json(adherent)
})

// Update adhérent
router.patch('/:id', (req, res) => {
    res.send({ message: req.params.id })
})

//  Delete adhérent
router.delete('/:id', (req, res) => {
    res.send({ message : req.params.id})
})
module.exports = router;