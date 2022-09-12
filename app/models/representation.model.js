const mongoose = require('mongoose');

// Portrait Schema
const PortraitSchema = new mongoose.Schema({
    titre: {
        type: String
    },
    id_mandat: {
        type: Number,
        required: true
    },
    id_portrait: {
        type: Number,
        required: true
    }
});

module.exports = new mongoose.model('Portrait', PortraitSchema);