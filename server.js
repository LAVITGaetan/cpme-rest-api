const express = require('express');
const app = express();
const services = require('./app/services/render')
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({message: 'Hello world'})
})


// ROUTES Adherents
app.get('/adherents', services.getAdherents)
app.get('/profil-adherent', services.getAdherent)
app.get('/add-adherent', services.addAdherent)
app.get('/edit-adherent', services.editAdherent)
app.get('/edit-contact', services.editContact)

// ROUTES Mandats
app.get('/mandats', services.getMandats)
app.get('/profil-mandat', services.getMandat)
app.get('/add-mandat', services.addMandat)
app.get('/edit-mandat', services.editMandat)

// ROUTES Mandataires
app.get('/mandataires', services.getMandataires)
app.get('/profil-mandataire', services.getMandataire)
app.get('/add-mandataire', services.addMandataire)
app.get('/edit-mandataire', services.editMandataire)

// ROUTES Sondages
app.get('/sondages', services.getSondages)
app.get('/profil-sondage', services.getSondage)
app.get('/add-sondage', services.addSondage)
app.get('/edit-sondage', services.editSondage)

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server running at : http://localhost:${PORT}`);
})