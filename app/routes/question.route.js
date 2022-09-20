const express = require('express')
const router = express.Router();
const Question = require('../models/question.model');
const Reponse = require('../models/reponse.model');

// Retrieve all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.send(questions)
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
})

// Retrieve all reponse from one question
router.get('/:id/reponses', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        const reponses = await Reponse.find({question_id: req.params.id})
        res.send({question : question, reponses: reponses})
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
})

// Retrieve one question
router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id)
        res.send(question)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Add question
router.post('/', async (req, res) => {
    const question = new Question(req.body);
    try {
        await question.save();
        res.send(question)
    } catch (error) {
        res.status(500).send({ message: error.message })
    console.log(error.message);
}
})

// Update question
router.patch('/:id', async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ question })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
    res.send({ message: req.params.id })
})

//  Delete question
router.delete('/:id', async (req, res) => {
    try {
        await Question.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Question supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
})
module.exports = router;