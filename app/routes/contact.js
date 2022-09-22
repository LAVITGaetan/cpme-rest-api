const express = require('express')
const router = express.Router();
const Contact = require('../models/contact');
const verify = require('./verifyToken')

// GET ALL
router.get('/', verify, async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.send(contacts)
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
})

// GET ONE
router.get('/:id', verify, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
        res.send(contact)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// GET related contact from adhérent
router.get('/adherent/:id', verify, async (req, res) => {
    try {
        const contacts = await Contact.find({ id_adherent: req.params.id })
        res.send(contacts)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// ADD ONE
router.post('/', verify, async (req, res) => {
    const contact = new Contact({
        titre: req.body.titre,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        telephone: req.body.telephone,
        linkedin: req.body.linkedin,
        id_adherent: req.body.id_adherent,
    });
    console.log('data envoyé : ' + contact);
    try {
        await contact.save();
        res.send(contact)
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
})

// UPDATE ONE
router.patch('/:id', verify, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ contact })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// DELETE ONE
router.delete('/:id', verify, async (req, res) => {
    try {
        await Contact.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Contact supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
})
module.exports = router;