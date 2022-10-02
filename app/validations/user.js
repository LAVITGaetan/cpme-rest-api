const { body } = require('express-validator');

module.exports = [
    body('nom').escape().isLength({min:3}),
    body('prenom').escape(),
    body('description').escape(),
]
