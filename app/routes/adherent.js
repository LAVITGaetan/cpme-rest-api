const express = require('express')
const router = express.Router();
const Controller = require('../controllers/adherent')
const verify = require('./verifyToken')

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
router.get('/', verify, Controller.getAdherents)

// Get one adhérent
router.get('/:id', verify, Controller.getAdherent)

// Add adhérent
router.post('/', verify, upload.single('adherentLogo'), Controller.addAdherent)

// Update adhérent
router.patch('/:id', verify, upload.single('adherentLogo'), Controller.editAdherent)

// Delete adhérent
router.delete('/:id', verify, Controller.deleteAdherent)

// PATCH status
router.patch('/status/:id/:boolean', verify, Controller.editStatus)

// PATCH parution
router.patch('/parution/:id/:boolean', verify, Controller.editParution)

module.exports = router;