const mongoose = require('mongoose');

// Sondage Schema
const SondageSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    titre: {
        type: String,
        required: true,
    },
    parution: {
        type: Boolean
    }
});

module.exports = new mongoose.model('Sondage', SondageSchema);