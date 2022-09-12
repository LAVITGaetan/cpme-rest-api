const express = require('express')
const router = express.Router();
const Mandataire = require('../models/mandataire.model');

// Retrieve all mandataires
router.get('/', (req, res) => {
    res.send({ message: 'Api working' })
})

// Retrieve one mandataire
router.get('/:id', (req, res) => {
    res.send({ message: req.params.id })
})

// Add mandataire
router.post('/', (req, res) => {
    const mandataire = req.body;
    res.json(mandataire)
})

// Update mandataire
router.patch('/:id', (req, res) => {
    res.send({ message: req.params.id })
})

//  Delete mandataire
router.delete('/:id', (req, res) => {
    res.send({ message : req.params.id})
})
module.exports = router;