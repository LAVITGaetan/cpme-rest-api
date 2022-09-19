const express = require('express')
const router = express.Router();
const Mandat = require('../models/mandat.model');

// MULTER Settings
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `logo_${req.body.label}_${file.originalname}`)
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

// Retrieve all mandats
router.get('/', async (req, res) => {
    try {
        const mandats = await Mandat.find();
        res.send(mandats)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Retrieve one mandat
router.get('/:id', async (req, res) => {
    try {
        const mandat = await Mandat.findById(req.params.id)
        res.send(mandat)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Add mandat
router.post('/', upload.single('mandatLogo'), async (req, res) => {
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
})


// Update mandat
router.patch('/:id', upload.single('mandatLogo'), async (req, res) => {
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
})

//  Delete mandat
router.delete('/:id', async (req, res) => {
    try {
        await Mandat.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Mandat supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
})
module.exports = router;