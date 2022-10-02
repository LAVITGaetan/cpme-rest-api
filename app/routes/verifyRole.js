
module.exports = function(req, res, next) {
    if(req.user.role === 'admin') {
        next();
    } else {
        res.status(401).send({message: 'Member cannot use this ressource'})
    }
}