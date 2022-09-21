const mongoose = require('mongoose');

// Mandat Schema
const MandatSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    nom: {
        type: String,
        required: true,
    },
    categorie: {
        type:String
    },
    mission: {
        type: String,
    },
    composition: {
        type: String,
    },
    duree: {
        type: String,
    },
    renouvellement: {
        type: String,
    },
    logo: {
        type: String
    }
});

module.exports = new mongoose.model('Mandat', MandatSchema);