const express = require('express');
const app = express();
const services = require('./app/services/render');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const adherentRoutes = require('./app/routes/adherent')
const contactRoutes = require('./app/routes/contact')
const mandatRoutes = require('./app/routes/mandat')
const mandataireRoutes = require('./app/routes/mandataire')
const representationRoutes = require('./app/routes/representation')
const sondageRoutes = require('./app/routes/sondage')
const questionRoutes = require('./app/routes/question')
const reponseRoutes = require('./app/routes/reponse')
const userRoutes = require('./app/routes/user')


const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:1400', 'http://localhost:9999', 'https://cpme-rest-api.herokuapp.com'],
    credentials: true,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'secretvariable',
}))
// Set view engine
app.set('view engine', 'ejs')
// Static Files
app.use(express.static('public'));

// ROUTES API
app.use('/api/adherents', adherentRoutes)
app.use('/api/contacts', contactRoutes)
app.use('/api/mandats', mandatRoutes)
app.use('/api/mandataires', mandataireRoutes)
app.use('/api/representations', representationRoutes)
app.use('/api/sondages', sondageRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/reponses', reponseRoutes)
app.use('/api/users', userRoutes)

// ROUTE Login
app.get('/login', services.login)

// ROUTE Index
app.get('/', services.index)

// ROUTES Adherents
app.get('/adherents', services.getAdherents)
app.get('/profil-adherent', services.getAdherent)
app.get('/add-adherent', services.addAdherent)
app.get('/edit-adherent', services.editAdherent)
app.get('/add-contact', services.addAdherentContact)
app.get('/edit-contact', services.editAdherentContact)

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