const express = require('express')
const router = express.Router();
const Mandat = require('../models/mandat.model');

// Retrieve all mandats
router.get('/', async (req, res) => {
    try {
        const mandats = await Mandat.find();
        res.send(mandats)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Retrieve one mandat
router.get('/:id', async (req, res) => {
    try {
        const mandat = await Mandat.findById(req.params.id)
        res.send(mandat)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Add mandat
router.post('/', async (req, res) => {
    const mandat = new Mandat(req.body);
    try {
        await mandat.save();
        res.send(mandat)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})
    
// Update mandat
router.patch('/:id', async (req, res) => {
    try {
        const mandat = await Mandat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ mandat })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
    res.send({ message: req.params.id })
})

//  Delete mandat
router.delete('/:id', async (req, res) => {
    try {
        await Mandat.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Mandat supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
})
module.exports = router;