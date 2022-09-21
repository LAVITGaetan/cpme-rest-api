const express = require('express')
const router = express.Router();
const Mandataire = require('../models/mandataire');
const Representation = require('../models/representation');
const verify = require('./verifyToken')

// MULTER Settings
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `logo_${req.body.nom}_${req.body.prenom}_${file.originalname}`)
    }
})
const fileFilter = function (req, file, cb) {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
});

// Retrieve all mandataires
router.get('/', verify, async (req, res) => {
    try {
        const mandataires = await Mandataire.find();
        res.send(mandataires)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Retrieve one mandataire
router.get('/:id', verify, async (req, res) => {
    try {
        const mandataire = await Mandataire.findById(req.params.id)
        res.send(mandataire)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Add mandataire
router.post('/', verify, upload.single('mandataireLogo'), async (req, res) => {
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
})

// Update mandataire
router.patch('/:id', verify, upload.single('mandataireLogo'), async (req, res) => {
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
    res.send({ message: req.params.id })
})

//  Delete mandataire
router.delete('/:id', verify, async (req, res) => {
    try {
        await Mandataire.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Mandataire supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
})

// Delete mandat and representations related
router.delete('/:id/representations', async (req, res) => {
    try {
        await Mandataire.findByIdAndRemove(req.params.id)
        await Representation.deleteMany({id_mandataire: req.params.id})
        res.send({message: 'Mandataire et representations liées au mandataire supprimé'})
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
})
module.exports = router;