const mongoose = require('mongoose');

// Representation Schema
const RepresentationSchema = new mongoose.Schema({
    titre: {
        type: String
    },
    id_mandat: {
        type: String,
        required: true
    },
    id_mandataire: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model('Representation', RepresentationSchema);