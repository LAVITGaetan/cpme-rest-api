const express = require('express')
const router = express.Router();
const Representation = require('../models/representation.model');

// Retrieve all representations
router.get('/', async (req, res) => {
    try {
        const representations = await Representation.find();
        res.send(representations)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Retrieve one representation
router.get('/:id', async (req, res) => {
    try {
        const representation = await Representation.findById(req.params.id)
        res.send(representation)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Add representation
router.post('/', async (req, res) => {
    const representation = new Representation(req.body);
    try {
        await representation.save();
        res.send(representation)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Update representation
router.patch('/:id', async (req, res) => {
    try {
        const representation = await Representation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ representation })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
    res.send({ message: req.params.id })
})

//  Delete representation
router.delete('/:id', async (req, res) => {
    try {
        await Representation.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Representation supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
})
module.exports = router;