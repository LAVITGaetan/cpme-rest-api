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
        titre: {
            type: String
        },
        nom: {
            type: String
        },
        prenom: {
            type: String
        },
        telephone: {
            type: String
        },
        email: {
            type: String
        },
        linkedin: {
            type: String
        }
    },
    contactSecondaire: {
        titre: {
            type: String
        },
        nom: {
            type: String
        },
        prenom: {
            type: String
        },
        telephone: {
            type: String
        },
        email: {
            type: String
        },
        linkedin: {
            type: String
        }
    }
});

module.exports = new mongoose.model('Adherent', AdherentSchema);