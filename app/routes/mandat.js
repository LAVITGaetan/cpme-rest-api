const express = require('express')
const router = express.Router();
const Mandat = require('../models/mandat');
const Representation = require('../models/representation');
const Controller = require('../controllers/mandat')
const verify = require('./verifyToken')
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
router.get('/', verify, Controller.getMandats)

// Retrieve one mandat
router.get('/:id', verify, Controller.getMandat)

// Add mandat
router.post('/', verify, upload.single('mandatLogo'), Controller.addMandat)


// Update mandat
router.patch('/:id', verify, upload.single('mandatLogo'), Controller.editMandat)

//  Delete mandat
router.delete('/:id', verify, Controller.deleteMandat)

// Delete mandat and representations related
router.delete('/:id/representations', Controller.deleteRepresentation)

module.exports = router;