const express = require('express')
const router = express.Router();
const Adherent = require('../models/adherent.model');

// MULTER Settings
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `logo_${req.body.entreprise}_${file.originalname}`)
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

// Get all adhérents
router.get('/', async (req, res) => {
    try {
        const adherents = await Adherent.find();
        res.send(adherents)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Get one adhérent
router.get('/:id', async (req, res) => {
    try {
        const adherent = await Adherent.findById(req.params.id)
        res.send(adherent)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Add adhérent
router.post('/', upload.single('adherentLogo'), async (req, res) => {
    if (req.file) {
        path = req.file.path.substring(7)
    }
    else {
        path = req.body.logo || 'none'
    }
    const adherent = new Adherent({
        entreprise: req.body.entreprise,
        section: req.body.section,
        adresse: req.body.adresse,
        activite: req.body.activite,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        telephone: req.body.telephone,
        identifiant: req.body.identifiant,
        siteweb: req.body.siteweb,
        logo: path,
        parution: req.body.parution,
        status: req.body.status,
        contact: {
            titre: req.body.contact_titre,
            nom: req.body.contact_nom,
            prenom: req.body.contact_prenom,
            telephone: req.body.contact_telephone,
            email: req.body.contact_email,
            linkedin: req.body.contact_linkedin
        },
        contactSecondaire: {
            titre: req.body.contactSecondaire_titre,
            nom: req.body.contactSecondaire_nom,
            prenom: req.body.contactSecondaire_prenom,
            telephone: req.body.contactSecondaire_telephone,
            email: req.body.contactSecondaire_email,
            linkedin: req.body.contactSecondaire_linkedin
        }
    });
    try {
        await adherent.save();
        res.send(adherent)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Update adhérent
router.patch('/:id', async (req, res) => {
    try {
        const adherent = await Adherent.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ adherent })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Delete adhérent
router.delete('/:id', async (req, res) => {
    try {
        await Adherent.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Adhérent supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
})

// PATCH status
router.patch('/status/:id/:boolean', async (req, res) => {
    const adherent = await Adherent.findByIdAndUpdate(req.params.id, {
        status: req.params.boolean
    })
    if (!adherent) res.status(404).send({ message: `Cannot get adherent with id : ${req.params.id}` })
    res.send(adherent);
})

// PATCH parution
router.patch('/parution/:id/:boolean', async (req, res) => {
    const adherent = await Adherent.findByIdAndUpdate(req.params.id, {
        parution: req.params.boolean
    })
    if (!adherent) res.status(404).send({ message: `Cannot get adherent with id : ${req.params.id}` })
    res.send(adherent);
})

module.exports = router;