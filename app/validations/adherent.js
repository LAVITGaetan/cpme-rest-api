const { body } = require('express-validator');

module.exports = [
    body('entreprise').escape(),
    body('section').escape(),
    body('adresse').escape(),
    body('activite').escape(),
    body('nom').escape(),
    body('prenom').escape(),
    body('email').escape(),
    body('telephone').escape(),
    body('identifiant').escape(),
    body('siteweb').escape(),
    body('parution').escape(),
    body('status').escape(),
]
