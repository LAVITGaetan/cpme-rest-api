const Mandataire = require('../models/mandataire')

exports.getMandataires = async (req, res) => {
    try {
        const mandataires = await Mandataire.find();
        res.send(mandataires)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.getMandataire = async (req, res) => {
    try {
        const mandataire = await Mandataire.findById(req.params.id)
        res.send(mandataire)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}