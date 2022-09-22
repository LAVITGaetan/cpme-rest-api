const axios = require('axios');

// Login
exports.login = (req, res) => {
    res.render('pages/login', { title: 'Connexion' })
}

// Index
exports.index = async (req, res) => {
    let token = req.cookies['token'] || '';
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/adherents`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/accueil', { title: 'Accueil', adherents: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

// Adhérents
exports.getAdherents = async (req, res) => {
    let token = req.cookies['token'] || '';
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/adherents`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/adherent/liste', { title: 'Liste des adhérents', adherents: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.getAdherent = async (req, res) => {
    let token = req.cookies['token'] || '';
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/adherents/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_contacts = await axios.get(`${process.env.LOCAL_API}/contacts/adherent/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/adherent/profil', { title: 'Profil adhérent', adherent: fetch.data, contacts: fetch_contacts.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.addAdherent = (req, res) => {
    res.render('pages/adherent/add', { title: 'Ajouter un adhérent' })
}

exports.editAdherent = async (req, res) => {
    let token = req.cookies['token'] || '';
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/adherents/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/adherent/edit', { title: 'Modifier un adhérent', adherent: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.addAdherentContact = async (req, res) => {
    let token = req.cookies['token'] || '';
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/adherents/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/adherent/add-contact', { title: 'Ajouter un contact', adherent: fetch.data })
    } catch (error) {   
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.editAdherentContact = async (req, res) => {
    let token = req.cookies['token'] || '';
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/adherents/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })

        console.log('contact id:' + req.query.contact);
        let fetch_contact = await axios.get(`${process.env.LOCAL_API}/contacts/${req.query.contact}`, {
            headers: {
                'auth-token': token
            }
        })


        res.render('pages/adherent/edit-contact', { title: 'Modifier un contact', adherent: fetch.data, contact: fetch_contact.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

// Mandats 
exports.getMandats = async (req, res) => {
    let token = req.cookies['token'] || '';
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/mandats`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_representations = await axios.get(`${process.env.LOCAL_API}/representations`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/mandat/liste', { title: 'Liste des mandats', mandats: fetch.data, representations: fetch_representations.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.getMandat = async (req, res) => {
    let token = req.cookies['token'] || '';
    try {
        let fetch_mandat = await axios.get(`${process.env.LOCAL_API}/mandats/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_mandataires = await axios.get(`${process.env.LOCAL_API}/mandataires`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_representations = await axios.get(`${process.env.LOCAL_API}/representations`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/mandat/profil', { title: 'Profil mandat', mandat: fetch_mandat.data, mandataires: fetch_mandataires.data, representations: fetch_representations.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.addMandat = (req, res) => {
    res.render('pages/mandat/add', { title: 'Ajouter un mandat' })
}

exports.editMandat = async (req, res) => {
    let token = req.cookies['token'] || '';
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/mandats/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/mandat/edit', { title: 'Modifier un mandat', mandat: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

// Mandataires 
exports.getMandataires = async (req, res) => {
    let token = req.cookies['token'] || '';
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/mandataires`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_representations = await axios.get(`${process.env.LOCAL_API}/representations`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/mandataire/liste', { title: 'Liste des mandataires', mandataires: fetch.data, representations: fetch_representations.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.getMandataire = async (req, res) => {
    let token = req.cookies['token'] || '';
    try {
        let fetch_mandataire = await axios.get(`${process.env.LOCAL_API}/mandataires/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_mandats = await axios.get(`${process.env.LOCAL_API}/mandats`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_representations = await axios.get(`${process.env.LOCAL_API}/representations`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/mandataire/profil', { title: 'Profil mandataire', mandataire: fetch_mandataire.data, mandats: fetch_mandats.data, representations: fetch_representations.data })

    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.addMandataire = (req, res) => {
    res.render('pages/mandataire/add', { title: 'Ajouter un mandataire' })
}

exports.editMandataire = async (req, res) => {
    let token = req.cookies['token'] || '';
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/mandataires/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/mandataire/edit', { title: 'Modifier un mandataire', mandataire: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

// Sondages
exports.getSondages = async (req, res) => {
    let token = req.cookies['token'] || '';
    try {
        let fetch = await axios.get(`${process.env.LOCAL_API}/sondages`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/sondage/liste', { title: 'Liste des sondages', sondages: fetch.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.getSondage = async (req, res) => {
    let token = req.cookies['token'] || '';
    try {
        let fetch_sondage = await axios.get(`${process.env.LOCAL_API}/sondages/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_questions = await axios.get(`${process.env.LOCAL_API}/sondages/${req.query.id}/questions`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/sondage/profil', { title: 'Profil sondage', sondage: fetch_sondage.data, questions: fetch_questions })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.addSondage = (req, res) => {
    res.render('pages/sondage/add', { title: 'Nouveau sondage' })
}

exports.editSondage = async (req, res) => {
    let token = req.cookies['token'] || '';
    try {
        let fetch_sondage = await axios.get(`${process.env.LOCAL_API}/sondages/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_questions = await axios.get(`${process.env.LOCAL_API}/sondages/${req.query.id}/questions`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/sondage/edit', { title: 'ProfEditer un sondage', sondage: fetch_sondage.data, questions: fetch_questions.data })
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}

exports.resultSondage = (req, res) => {
    let token = req.cookies['token'] || '';
    res.render('pages/sondage/result', { title: 'Réponses au sondage' })
}