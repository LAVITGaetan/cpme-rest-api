const express = require('express')
const router = express.Router();
const representation = require('../models/representation.model');

// Retrieve all representations
router.get('/', (req, res) => {
    res.send({ message: 'Api working' })
})

// Retrieve one representation
router.get('/:id', (req, res) => {
    res.send({ message: req.params.id })
})

// Add representation
router.post('/', (req, res) => {
    const representation = req.body;
    res.json(representation)
})

// Update representation
router.patch('/:id', (req, res) => {
    res.send({ message: req.params.id })
})

//  Delete representation
router.delete('/:id', (req, res) => {
    res.send({ message : req.params.id})
})
module.exports = router;