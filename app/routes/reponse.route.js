const express = require('express')
const router = express.Router();
const Reponse = require('../models/reponse.model');
const verify = require('./verifyToken')

// GET ALL
router.get('/', verify, async (req, res) => {
    try {
        const reponses = await Reponse.find();
        res.send(reponses)
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
})

// GET ONE
router.get('/:id', verify, async (req, res) => {
    try {
        const reponse = await Reponse.findById(req.params.id)
        res.send(reponse)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// ADD ONE
router.post('/', verify, async (req, res) => {
    const reponse = new Reponse(req.body);
    try {
        await reponse.save();
        res.send(reponse)
    } catch (error) {
        res.status(500).send({ message: error.message })
    console.log(error.message);
}
})

// UPDATE ONE
router.patch('/:id', verify, async (req, res) => {
    try {
        const reponse = await Reponse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ reponse })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// DELETE ONE
router.delete('/:id', verify, async (req, res) => {
    try {
        await Reponse.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Reponse supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
})
module.exports = router;