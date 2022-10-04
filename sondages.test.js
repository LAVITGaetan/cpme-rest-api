const express = require('express');
const request = require('supertest')
const sondageRoutes = require('./app/routes/sondage')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/sondages', sondageRoutes)
const mongoose = require('mongoose')
require('dotenv').config();
const sondage = {
    logo: 'upload/test.png',
    nom: 'LOCATEEE',
    prenom: 'Ismaëloo',
    description: 'Membre fondateur de la CPME',
}

const sondagePartial = {
    logo: 'upload/test.png',
    prenom: 'Sébastien',
    description: 'Nouvel adhérent',
}
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true })

    const member_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzM4MWE2OThlY2NhNDQ1MDE4NDA2NzIiLCJyb2xlIjoibWVtYnJlIiwiaWF0IjoxNjY0NzE0ODM4LCJleHAiOjE2NjQ4MDEyMzh9.SbgXUNCp9CICmWPK5bHnLhUR3IRxO6laBe7r25gIdRM'
    const admin_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzI4MWQzZDFmMTc3MTJhOTQ5ZWZjNWMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjQ3MjA1NTEsImV4cCI6MTY2NDgwNjk1MX0.T68bvgFF2Gqw65JvLbNFPNeb0oMumcvxBWR7dOwafKk'

describe('Check Route', () => {
    it('GET request without token', async () => {
        const res = await request(app).get('/api/sondages')
        expect(res.status).toEqual(500);
    });

    it('GET request with token', async () => {
        const res = await request(app).get('/api/sondages').set({ 'auth-token': member_token })
        expect(res.status).toEqual(200);
    });

    it('POST request without token', async () => {
        const res = await request(app).post('/api/sondages').send(sondage)
        expect(res.status).toEqual(500)
    })

    it('POST request with member role', async () => {
        const res = await request(app).post('/api/sondages').send(sondage).set({ 'auth-token': member_token })
        expect(res.body.message).toEqual('Member cannot use this ressource');
        expect(res.status).toEqual(403)
    })

    it('POST request with admin role and valid object', async () => {
        const res = await request(app).post('/api/sondages').send(sondage).set({ 'auth-token': admin_token })
        expect(res.status).toEqual(200)
    })

    it('POST request with admin role and invalid Object', async () => {
        const res = await request(app).post('/api/sondages').send(sondagePartial).set({ 'auth-token': admin_token })
        expect(res.status).toEqual(500)
    })
});