const Mandat = require('../models/mandat')
const Representation = require('../models/representation');

exports.getMandats = async (req, res) => {
    try {
        const mandats = await Mandat.find();
        res.send(mandats)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.getMandat = async (req, res) => {
    try {
        const mandat = await Mandat.findById(req.params.id)
        res.send(mandat)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.addMandat = async (req, res) => {
    if (req.file) {
        path = req.file.path.substring(7)
    }
    else {
        path = req.body.logo || 'none'
    }
    const mandat = new Mandat({
        label: req.body.label,
        nom: req.body.nom,
        categorie: req.body.categorie,
        mission: req.body.mission,
        composition: req.body.composition,
        duree: req.body.duree,
        renouvellement: req.body.renouvellement,
        logo: path
    });
    try {
        await mandat.save();
        res.send(mandat)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.editMandat = async (req, res) => {
    if (req.file) {
        path = req.file.path.substring(7)
    }
    else {
        path = req.body.logo || 'none'
    }
    const mandat = {
        label: req.body.label,
        nom: req.body.nom,
        categorie: req.body.categorie,
        mission: req.body.mission,
        composition: req.body.composition,
        duree: req.body.duree,
        renouvellement: req.body.renouvellement,
        logo: path
    };
    try {
        const updatedMandat = await Mandat.findByIdAndUpdate(req.params.id, mandat, { new: true });
        res.send({ updatedMandat })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
    res.send({ message: req.params.id })
}

exports.deleteMandat = async (req, res) => {
    try {
        await Mandat.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Mandat supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
}
exports.deleteRepresentation = async (req, res) => {
    try {
        await Mandat.findByIdAndRemove(req.params.id)
        await Representation.deleteMany({id_mandat: req.params.id})
        res.send({message: 'Mandat et representations liées au mandat supprimé'})
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}