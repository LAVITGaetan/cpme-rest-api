const express = require('express')
const router = express.Router();
const Sondage = require('../models/sondage');
const Question = require('../models/question');
const Reponse = require('../models/reponse');
const verify = require('./verifyToken')

// Retrieve all sondages
router.get('/', verify, async (req, res) => {
    try {
        const sondages = await Sondage.find();
        res.send(sondages)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Retrieve one sondage
router.get('/:id', verify, async (req, res) => {
    try {
        const sondage = await Sondage.findById(req.params.id)
        res.send(sondage)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Retrieve questions from one sondage
router.get('/:id/questions', verify, async (req, res) => {
    try {
        const questions = await Question.find().sort({ order: 1});
        let sondage_questions = questions.filter(el => el.form_id === req.params.id);
        res.send(sondage_questions)
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
})

// Retrieve reponses from one sondage
router.get('/:id/reponses', verify, async (req, res) => {
    try {
        const reponses = await Reponse.find();
        let sondage_reponses = reponses.filter(el => el.form_id === req.params.id);
        res.send(sondage_reponses)
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
})

// Add sondage
router.post('/', verify, async (req, res) => {
    const sondage = new Sondage(req.body);
    try {
        await sondage.save();
        res.send(sondage)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Update sondage
router.patch('/:id', verify, async (req, res) => {
    try {
        const sondage = await Sondage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ sondage })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
    res.send({ message: req.params.id })
})

//  Delete sondage
router.delete('/:id', verify, async (req, res) => {
    try {
        await Sondage.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Sondage supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
})

// Delete questions from one sondage
router.delete('/:id/questions', verify, async (req, res) => {
    try {
        await Question.deleteMany({form_id: req.params.id});
        res.send('Questions liées au sondage supprimées')
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
})
module.exports = router;