const axios = require('axios');

// Login
exports.login = (req, res) => {
    res.json({ message: 'Page de connexion' })
}

exports.index = async (req, res) => {
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/adherents`)
        res.render('pages/accueil', { title: 'Accueil', adherents: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

// Adhérents
exports.getAdherents = async (req, res) => {
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/adherents`)
        res.render('pages/adherent/liste', { title: 'Liste des adhérents', adherents: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.getAdherent = async (req, res) => {
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/adherents/${req.query.id}`)
        res.render('pages/adherent/profil', { title: 'Profil adhérent', adherent: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.addAdherent = (req, res) => {
    res.render('pages/adherent/add', { title: 'Ajouter un adhérent' })
}

exports.editAdherent = async (req, res) => {
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/adherents/${req.query.id}`)
        res.render('pages/adherent/edit', { title: 'Modifier un adhérent', adherent: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.editContact = async (req, res) => {
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/adherents/${req.query.id}`)
        res.render('pages/adherent/edit-contact', { title: 'Modifier un contact', adherent: fetch.data })
        console.log(`données de contact récupérées : ${fetch.data.contact}`);
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

// Mandats 
exports.getMandats = async (req, res) => {
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/mandats`)
        let fetch_representations = await axios.get(`${process.env.LOCAL_API}/representations`)
        res.render('pages/mandat/liste', { title: 'Liste des mandats', mandats: fetch.data, representations: fetch_representations.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.getMandat = async (req, res) => {
    try {
        let fetch_mandat = await axios.get(`${process.env.LOCAL_API}/mandats/${req.query.id}`)
        let fetch_mandataires = await axios.get(`${process.env.LOCAL_API}/mandataires`)
        let fetch_representations = await axios.get(`${process.env.LOCAL_API}/representations`)
        res.render('pages/mandat/profil', { title: 'Profil mandat', mandat: fetch_mandat.data, mandataires: fetch_mandataires.data, representations: fetch_representations.data  })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.addMandat = (req, res) => {
    res.render('pages/mandat/add', { title: 'Ajouter un mandat' })
}

exports.editMandat = async (req, res) => {
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/mandats/${req.query.id}`)
        res.render('pages/mandat/edit', { title: 'Modifier un mandat', mandat: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

// Mandataires 
exports.getMandataires = async (req, res) => {
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/mandataires`)
        res.render('pages/mandataire/liste', { title: 'Liste des mandataires', mandataires: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.getMandataire = async (req, res) => {
    try {
        let fetch_mandataire = await axios.get(`${process.env.LOCAL_API}/mandataires/${req.query.id}`)
        let fetch_mandats = await axios.get(`${process.env.LOCAL_API}/mandats`)
        let fetch_representations = await axios.get(`${process.env.LOCAL_API}/representations`)
        res.render('pages/mandataire/profil', { title: 'Profil mandataire', mandataire: fetch_mandataire.data, mandats: fetch_mandats.data, representations: fetch_representations.data  })

    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.addMandataire = (req, res) => {
    res.render('pages/mandataire/add', { title: 'Ajouter un mandataire' })
}

exports.editMandataire = async (req, res) => {
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/mandataires/${req.query.id}`)
        res.render('pages/mandataire/edit', { title: 'Modifier un mandataire', mandataire: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

// Sondages
exports.getSondages = async (req, res) => {
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/sondages`)
        res.render('pages/sondage/liste', { title: 'Liste des sondages', sondages: fetch.data})
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.getSondage = async (req, res) => {
    try {
        let fetch_sondage = await axios.get(`${process.env.LOCAL_API}/sondages/${req.query.id}`)
        let fetch_questions = await axios.get(`${process.env.LOCAL_API}/sondages/${req.query.id}/questions`)
        res.render('pages/sondage/profil', { title: 'Profil sondage', sondage: fetch_sondage.data, questions: fetch_questions})
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.addSondage = (req, res) => {
    res.render('pages/sondage/add', { title: 'Nouveau sondage' })
}

exports.editSondage = async (req, res) => {
    try {
        let fetch_sondage = await axios.get(`${process.env.LOCAL_API}/sondages/${req.query.id}`)
        let fetch_questions = await axios.get(`${process.env.LOCAL_API}/sondages/${req.query.id}/questions`)
        res.render('pages/sondage/edit', { title: 'ProfEditer un sondage', sondage: fetch_sondage.data, questions: fetch_questions.data})
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.resultSondage = (req, res) => {
    res.render('pages/sondage/result', { title: 'Réponses au sondage' })
}