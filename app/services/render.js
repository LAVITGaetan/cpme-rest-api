// Login
exports.login  = (req, res) => {
    res.json({message: 'Page de connexion'})
}

exports.index = (req, res) => {
    res.json({message: 'Page d\'accueil'})
}


// Adhérents
exports.getAdherents = (req, res) => {
    res.send('Liste des adhérents')
}

exports.getAdherent = (req, res) => {
    res.send('Profil adhérent')
}

exports.addAdherent = (req, res) => {
    res.send('Ajouter un adhérent')
}

exports.editAdherent = (req, res) => {
    res.send('Modifier un adhérent')
}

exports.editContact = (req, res) => {
    res.send('Modifier les informations de contact d\' un adhérent')
}

// Mandats 
exports.getMandats = (req, res) => {
    res.send('Liste des mandats')
}

exports.getMandat = (req, res) => {
    res.send('Profil mandat')
}

exports.addMandat = (req, res) => {
    res.send('Ajouter un mandat')
}

exports.editMandat = (req, res) => {
    res.send('Modifier un mandat')
}

// Mandataires
exports.getMandataires = (req, res) => {
    res.send('Liste des mandataires')
}

exports.getMandataire = (req, res) => {
    res.send('Profil mandataire')
}

exports.addMandataire = (req, res) => {
    res.send('Ajouter un mandataire')
}

exports.editMandataire = (req, res) => {
    res.send('Modifier un mandataire')
}

// Sondages
exports.getSondages = (req, res) => {
    res.send('Liste des sondages')
}

exports.getSondage = (req, res) => {
    res.send('Profil sondage')
}

exports.addSondage = (req, res) => {
    res.send('Ajouter un sondage')
}

exports.editSondage  = (req, res) => {
    res.send('Modifier un sondage')
}