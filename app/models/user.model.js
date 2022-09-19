const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    identifiant: {
        type: String,
        required: true
    },
});

module.exports = new mongoose.model('User', UserSchema);