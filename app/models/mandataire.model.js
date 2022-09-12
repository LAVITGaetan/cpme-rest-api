const mongoose = require('mongoose');

// Mandataire Schema
const MandataireSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    }
});

module.exports = new mongoose.model('Mandataire', MandataireSchema);