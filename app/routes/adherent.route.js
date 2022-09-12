const express = require('express')
const router = express.Router();
const Adherent = require('../models/adherent.model');

// GET Route
router.get('/', async (req, res) => {
    res.send({ message: 'Api working' })
})

module.exports = router;