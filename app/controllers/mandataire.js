const Mandataire = require('../models/mandataire')

exports.getMandataires = async (req, res) => {
    try {
        const mandataires = await Mandataire.find();
        res.send(mandataires)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}