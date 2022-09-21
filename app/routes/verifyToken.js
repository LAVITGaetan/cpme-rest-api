const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    console.log(req.cookies['token']);
    const token = req.header('auth-token') || req.body.token || req.cookies['token'];
    if(!token) res.status(401).send('Accès refusé')
    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        // accessible depuis les routes
        req.user = verified;
        next();
    } catch (error) {
        console.log(error.message);
        res.end();
    }
}