const express = require('express')
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken')
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 10,
	standardHeaders: true,
	legacyHeaders: false,
})
// Get all users
router.get('/', verify, async (req, res) => {
    let token = req.header('auth-token') || req.cookies('token');
    try {
        const users = await User.find();
        res.header('auth-token', token).send(users)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Get one user
router.get('/:id', verify, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Add user
router.post('/', verify, async (req, res) => {

    // Check if email is already existing
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) {
        res.send('Un compte avec cette adresse e-mail éxiste déjà')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.identifiant, salt)

    // Define and send User
    let user = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        identifiant: hashPassword,
        role: req.body.role,
    });
    try {
        await user.save();
        res.send({ user: user._id })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Login
router.post('/login', limiter, async (req, res) => {
    if (req.body.email && req.body.identifiant) {
        // Check if email exist
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.send({ message: 'Identifiant incorrect' })
        }

        // Check if passwords match
        const validPassword = await bcrypt.compare(req.body.identifiant, user.identifiant)
        if (!validPassword) return res.send({ message: 'Mot de passe incorrect' })

        // Set token
        const secret_token = process.env.SECRET_TOKEN;
        // 24h 
        const expirationSeconds = 86400;
        const token = jwt.sign({ _id: user._id, role: user.role }, secret_token, { expiresIn: "24h" });
        res.cookie("token", token, { maxAge: expirationSeconds * 1000, httpOnly: true, secure:true })
        res.header('auth-token', token).send({ token: token })
    }
    else {
        res.send({ message: 'Email and password must be filled' })
    }

})

// Update user
router.patch('/:id', verify, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ user })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Delete user
router.delete('/:id', verify, async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Adhérent supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
})

module.exports = router;