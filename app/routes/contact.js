const express = require('express')
const router = express.Router();
const verify = require('./verifyToken')
const Controller = require('../controllers/contact')

// GET ALL
router.get('/', verify, Controller.getContacts)

// GET ONE
router.get('/:id', verify, Controller.getContact)

// GET related contact from adhérent
router.get('/adherent/:id', verify, Controller.getContactFromAdherent)

// ADD ONE
router.post('/', verify, Controller.addContact)

// UPDATE ONE
router.patch('/:id', verify, Controller.editContact)

// DELETE ONE
router.delete('/:id', verify, Controller.deleteContact)

module.exports = router;