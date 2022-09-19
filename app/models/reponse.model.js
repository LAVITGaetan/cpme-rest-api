const mongoose = require('mongoose');

// Reponse Schema
const ReponseSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },  
    reponse_id: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model('Reponse', ReponseSchema);