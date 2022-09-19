const express = require('express')
const router = express.Router();
const Adherent = require('../models/adherent.model');

// Get all adhérents
router.get('/', async (req, res) => {
    try {
        const adherents = await Adherent.find();
        res.send(adherents)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Get one adhérent
router.get('/:id', async (req, res) => {
    try {
        const adherent = await Adherent.findById(req.params.id)
        res.send(adherent)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Add adhérent
router.post('/', async (req, res) => {
    const adherent = new Adherent(req.body);
    try {
        await adherent.save();
        res.send(adherent)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})

// Update adhérent
router.patch('/:id', async (req, res) => {
    try {
        const adherent = await Adherent.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ adherent })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Delete adhérent
router.delete('/:id', async (req, res) => {
    try {
        await Adherent.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Adhérent supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
})

// PATCH status
router.patch('/status/:id/:boolean', async (req, res) => {
    const adherent = await Adherent.findByIdAndUpdate(req.params.id, {
        status: req.params.boolean
    })
    if (!adherent) res.status(404).send({ message: `Cannot get adherent with id : ${req.params.id}` })
    res.send(adherent);
})

// PATCH parution
router.patch('/parution/:id/:boolean', async (req, res) => {
    const adherent = await Adherent.findByIdAndUpdate(req.params.id, {
        parution: req.params.boolean
    })
    if (!adherent) res.status(404).send({ message: `Cannot get adherent with id : ${req.params.id}` })
    res.send(adherent);
})

module.exports = router;