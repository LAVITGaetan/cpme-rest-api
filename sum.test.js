const express = require('express');
const request = require('supertest')
const mandataireRoutes = require('./app/routes/mandataire')
const app = express();
app.use('/api/mandataires', mandataireRoutes)
const mongoose = require('mongoose')
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true })
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzM4MWE2OThlY2NhNDQ1MDE4NDA2NzIiLCJyb2xlIjoibWVtYnJlIiwiaWF0IjoxNjY0NzE0ODM4LCJleHAiOjE2NjQ4MDEyMzh9.SbgXUNCp9CICmWPK5bHnLhUR3IRxO6laBe7r25gIdRM'

describe('Check Route', () => {
    it('responds to GET request without token', async () => {
        const res = await request(app).get('/api/mandataires')
        expect(res.status).toEqual(500);
        expect(res.body.message).toEqual('Accès refusé');
    });
    
    it('responds to GET request with token', async () => {
        const res = await request(app).get('/api/mandataires').set({'auth-token': token})
        expect(res.status).toEqual(200);
    });

});