const express = require('express')
const router = express.Router();
const Representation = require('../models/representation');
const verify = require('./verifyToken')

// Retrieve all representations
router.get('/', verify, async (req, res) => {
    try {
        const representations = await Representation.find();
        res.send(representations)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Retrieve one representation
router.get('/:id', verify, async (req, res) => {
    try {
        const representation = await Representation.findById(req.params.id)
        res.send(representation)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Add representation
router.post('/', verify, async (req, res) => {
    const representation = new Representation({
        titre: req.body.titre,
        id_mandat: req.body.id_mandat,
        id_mandataire: req.body.id_mandataire,
    });
    try {
        await representation.save();
        res.send(representation)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Update representation
router.patch('/:id', verify, async (req, res) => {
    try {
        const representation = await Representation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ representation })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

//  Delete representation
router.delete('/:id', verify, async (req, res) => {
    try {
        await Representation.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Representation supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
})

//  Delete representations from mandat
router.delete('/:id/mandats', verify, async (req, res) => {
    try {
        await Representation.deleteMany({id_mandat: req.params.id})
        res.status(200).send({ message: 'Representations supprimées' })
    } catch (error) {
        res.send({ message: error.message })
        console.log(error.message);
    }
})


//  Delete representations from mandataire
router.delete('/:id/mandataires', verify, async (req, res) => {
    try {
        await Representation.deleteMany({id_mandataire: req.params.id})
        res.status(200).send({ message: 'Representations supprimées' })
    } catch (error) {
        res.send({ message: error.message })
        console.log(error.message);
    }
})
module.exports = router;