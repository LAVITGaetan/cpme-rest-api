const mongoose = require('mongoose');

// Adhérent Schema
const AdherentSchema = new mongoose.Schema({
    entreprise: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    adresse: {
        type: String,
        required: true,
    },
    activite: {
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
        required: true,
    },
    telephone: {
        type: String,
    },
    identifiant: {
        type: String,
        required: true,
    },
    siteweb: {
        type: String,
    },
    logo: {
        type: String,
    },
    parution: {
        type: Boolean,
    },
    status: {
        type: Boolean,
    },  
    contact: {
        titre : String,
        nom : String,
        prenom : String,
        telephone : String,
        email : String,
        linkedin : String
    },
    contactSecondaire: {
        titre : String,
        nom : String,
        prenom : String,
        telephone : String,
        email : String,
        linkedin : String
    }
});

module.exports = new mongoose.model('Adherent', AdherentSchema);