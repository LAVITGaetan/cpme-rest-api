const axios = require('axios');

// Login
exports.login = (req, res) => {
    res.json({ message: 'Page de connexion' })
}

exports.index = async (req, res) => {
    try {
        let fetch = await axios.get(`https://cpme-rest-api.herokuapp.com/adherents`)
        res.render('pages/accueil', { title: 'Accueil', adherents: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// Adhérents
exports.getAdherents = async (req, res) => {
    try {
        let fetch = await axios.get(`https://cpme-rest-api.herokuapp.com/adherents`)
        res.render('pages/adherent/liste', { title: 'Liste des adhérents', adherents: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.getAdherent = async (req, res) => {
    try {
        let fetch = await axios.get(`https://cpme-rest-api.herokuapp.com/adherents/${req.query.id}`)
        res.render('pages/adherent/profil', { title: 'Profil adhérent', adherent: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.addAdherent = (req, res) => {
    res.render('pages/adherent/add', { title: 'Ajouter un adhérent' })
}

exports.editAdherent = async (req, res) => {
    try {
        let fetch = await axios.get(`https://cpme-rest-api.herokuapp.com/adherents/${req.query.id}`)
        res.render('pages/adherent/edit', { title: 'Modifier un adhérent', adherent: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.editContact = async (req, res) => {
    try {
        let fetch = await axios.get(`https://cpme-rest-api.herokuapp.com/adherents/${req.query.id}`)
        res.render('pages/adherent/edit-contact', { title: 'Modifier un contact', adherent: fetch.data })
        console.log(`données de contact récupérées : ${fetch.data.contact}`);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// Mandats 
exports.getMandats = async (req, res) => {
    try {
        let fetch = await axios.get(`https://cpme-rest-api.herokuapp.com/mandats`)
        res.render('pages/mandat/liste', { title: 'Liste des mandats', mandats: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.getMandat = async (req, res) => {
    try {
        let fetch = await axios.get(`https://cpme-rest-api.herokuapp.com/mandats/${req.query.id}`)
        res.render('pages/mandat/profil', { title: 'Profil mandat', mandat: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.addMandat = (req, res) => {
    res.render('pages/mandat/add', { title: 'Ajouter un mandat' })
}

exports.editMandat = async (req, res) => {
    try {
        let fetch = await axios.get(`https://cpme-rest-api.herokuapp.com/mandats/${req.query.id}`)
        res.render('pages/mandat/edit', { title: 'Modifier un mandat', mandat: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// Mandataires 
exports.getMandataires = async (req, res) => {
    try {
        let fetch = await axios.get(`https://cpme-rest-api.herokuapp.com/mandataires`)
        res.render('pages/mandataire/liste', { title: 'Liste des mandataires', mandataires: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.getMandataire = async (req, res) => {
    try {
        let fetch = await axios.get(`https://cpme-rest-api.herokuapp.com/mandataires/${req.query.id}`)
        res.render('pages/mandataire/profil', { title: 'Profil mandataire', mandataire: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.addMandataire = (req, res) => {
    res.render('pages/mandataire/add', { title: 'Ajouter un mandataire' })
}

exports.editMandataire = async (req, res) => {
    try {
        let fetch = await axios.get(`https://cpme-rest-api.herokuapp.com/mandataires/${req.query.id}`)
        res.render('pages/mandataire/edit', { title: 'Modifier un mandataire', mandataire: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// Sondages
exports.getSondages = async (req, res) => {
    try {
        let fetch = await axios.get(`https://cpme-rest-api.herokuapp.com/sondages`)
        res.render('pages/sondage/liste', { title: 'Liste des sondages', sondages: {
            nom : "formulaire 1",
            titre : "",
            parution : "",
        } })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.getSondage = (req, res) => {
    res.render('pages/sondage/profil', { title: 'Sondage' })
}

exports.addSondage = (req, res) => {
    res.render('pages/sondage/add', { title: 'Nouveau sondage' })
}

exports.editSondage = (req, res) => {
    res.render('pages/sondage/edit', { title: 'Edition de sondage' })
}

exports.resultSondage = (req, res) => {
    res.render('pages/sondage/result', { title: 'Réponses au sondage' })
}