const Contact = require('../models/contact')

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.send(contacts)
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
        res.send(contact)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.getContactFromAdherent = async (req, res) => {
    try {
        const contacts = await Contact.find({ id_adherent: req.params.id })
        res.send(contacts)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.addContact = async (req, res) => {
    const contact = new Contact({
        titre: req.body.titre,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        telephone: req.body.telephone,
        linkedin: req.body.linkedin,
        id_adherent: req.body.id_adherent,
    });
    try {
        await contact.save();
        res.send(contact)
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.editContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ contact })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.deleteContact = async (req, res) => {
    try {
        await Contact.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Contact supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
}