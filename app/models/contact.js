const mongoose = require('mongoose');

// Contact Schema
const ContactSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
    },
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    telephone: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    id_adherent: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model('Contact', ContactSchema);