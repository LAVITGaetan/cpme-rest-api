const express = require('express');
const app = express();
const services = require('./app/services/render');
const mongoose = require('mongoose');
require('dotenv').config();
const adherentRoutes = require('./app/routes/adherent.route')
const mandatRoutes = require('./app/routes/mandat.route')
const mandataireRoutes = require('./app/routes/mandataire.route')
const representationRoutes = require('./app/routes/representation.route')

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs')
// Static Files
app.use(express.static('public'));

// ROUTES API
app.use('/api/adherents', adherentRoutes)
app.use('/api/mandats', mandatRoutes)
app.use('/api/mandataires', mandataireRoutes)
app.use('/api/representations', representationRoutes)

// ROUTE Login
app.get('/login', services.login)

// ROUTE Index
app.get('/', services.index)

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

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true })
    .then(() => {
        console.log('connected to database');
    }).catch(error => {
        console.log(`an error happened : ${error}`);
    })
    
// START SERVER    
app.listen(PORT, () => {
    console.log(`Server running at : http://localhost:${PORT}`);
})