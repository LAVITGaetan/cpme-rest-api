const express = require('express')
const router = express.Router();
const Sondage = require('../models/sondage.model');
const Question = require('../models/question.model');

// Retrieve all sondages
router.get('/', async (req, res) => {
    try {
        const sondages = await Sondage.find();
        res.send(sondages)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Retrieve one sondage
router.get('/:id', async (req, res) => {
    try {
        const sondage = await Sondage.findById(req.params.id)
        res.send(sondage)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Retrieve one sondage
router.get('/:id/questions', async (req, res) => {
    try {
        const questions = await Question.find().sort({ order: 1});
        let sondage_questions = questions.filter(el => el.form_id === req.params.id);
        res.send(sondage_questions)
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
})

// Add sondage
router.post('/', async (req, res) => {
    const sondage = new Sondage(req.body);
    try {
        await sondage.save();
        res.send(sondage)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Update sondage
router.patch('/:id', async (req, res) => {
    try {
        const sondage = await Sondage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ sondage })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
    res.send({ message: req.params.id })
})

//  Delete sondage
router.delete('/:id', async (req, res) => {
    try {
        await Sondage.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Sondage supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
})
module.exports = router;