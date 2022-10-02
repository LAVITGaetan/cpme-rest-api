const Mandataire = require('../models/mandataire')
const Representation = require('../models/representation');

exports.getMandataires = async (req, res) => {
    try {
        const mandataires = await Mandataire.find();
        res.send(mandataires)
    } catch (error) {
        res.status(500).send({ message: 'Accès refusé' })
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

exports.addMandataire = async (req, res) => {
    if (req.file) {
        path = req.file.path.substring(7)
    }
    else {
        path = req.body.logo || 'none'
    }
    const mandataire = new Mandataire({
        nom: req.body.nom,
        prenom: req.body.prenom,
        description: req.body.description,
        logo: path
    });
    try {
        await mandataire.save();
        res.send(mandataire)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.editMandataire = async (req, res) => {
    if (req.file) {
        path = req.file.path.substring(7)
    }
    else {
        path = req.body.logo || 'none'
    }
    const mandataire = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        description: req.body.description,
        logo: path
    };
    try {
        const updatedMandataire = await Mandataire.findByIdAndUpdate(req.params.id, mandataire, { new: true });
        res.send({ updatedMandataire })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.deleteMandataire = async (req, res) => {
    try {
        await Mandataire.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Mandataire supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
}

exports.deleteRepresentation = async (req, res) => {
    try {
        await Mandataire.findByIdAndRemove(req.params.id)
        await Representation.deleteMany({id_mandataire: req.params.id})
        res.send({message: 'Mandataire et representations liées au mandataire supprimé'})
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}