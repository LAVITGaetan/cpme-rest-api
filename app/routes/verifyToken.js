const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.body.token;
    if(!token) res.status(401).send('Accès refusé')
    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        // accessible depuis les routes
        req.user = verified;
        next();
    } catch (error) {
        console.log(error.message);
        res.send('Token invalide')
        next();
    }
}