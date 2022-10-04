const Sondage = require('../models/sondage')
const Question = require('../models/question')
const Reponse = require('../models/reponse')

exports.getSondages = async (req, res) => {
    try {
        const sondages = await Sondage.find();
        res.status(200).send(sondages)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.getSondage = async (req, res) => {
    try {
        const sondage = await Sondage.findById(req.params.id)
        res.status(200).send(sondage)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find().sort({ order: 1});
        let sondage_questions = questions.filter(el => el.form_id === req.params.id);
        res.send(sondage_questions)
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.getReponses = async (req, res) => {
    try {
        const reponses = await Reponse.find();
        let sondage_reponses = reponses.filter(el => el.form_id === req.params.id);
        res.send(sondage_reponses)
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.addSondage = async (req, res) => {
    const sondage = new Sondage(req.body);
    try {
        await sondage.save();
        res.send(sondage)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.editSondage = async (req, res) => {
    try {
        const sondage = await Sondage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ sondage })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.deleteSondage = async (req, res) => {
    try {
        await Sondage.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Sondage supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
}

exports.deleteQuestions = async (req, res) => {
    try {
        await Question.deleteMany({form_id: req.params.id});
        res.send('Questions liées au sondage supprimées')
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}