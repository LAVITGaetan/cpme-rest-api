const express = require('express')
const router = express.Router();
const Mandataire = require('../models/mandataire.model');

// Retrieve all mandataires
router.get('/', async (req, res) => {
    try {
        const mandataires = await Mandataire.find();
        res.send(mandataires)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Retrieve one mandataire
router.get('/:id', async (req, res) => {
    try {
        const mandataire = await Mandataire.findById(req.params.id)
        res.send(mandataire)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Add mandataire
router.post('/', async (req, res) => {
    const mandataire = new Mandataire(req.body);
    try {
        await mandataire.save();
        res.send(mandataire)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Update mandataire
router.patch('/:id', async (req, res) => {
    try {
        const mandataire = await Mandataire.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ mandataire })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
    res.send({ message: req.params.id })
})

//  Delete mandataire
router.delete('/:id', async (req, res) => {
    try {
        await Mandataire.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Mandataire supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
})
module.exports = router;