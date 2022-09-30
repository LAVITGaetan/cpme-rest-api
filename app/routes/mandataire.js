const express = require('express')
const router = express.Router();
const verify = require('./verifyToken');
const Controller = require('../controllers/mandataire')
const { body, validationResult } = require('express-validator');

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
router.get('/', verify, Controller.getMandataires)

// Retrieve one mandataire
router.get('/:id', verify, Controller.getMandataire)

// Add mandataire
router.post('/', verify, upload.single('mandataireLogo'), body('prenom').isLength({ min: 5 }).trim(), function (req, res, next) {
    console.log('hello');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
}, Controller.addMandataire)

// Update mandataire
router.patch('/:id', verify, upload.single('mandataireLogo'), Controller.editMandataire)

//  Delete mandataire
router.delete('/:id', verify, Controller.deleteMandataire)

// Delete representation and mandats related
router.delete('/:id/representations', Controller.deleteRepresentation)

module.exports = router;