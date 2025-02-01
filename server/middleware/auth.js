const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(401).send('Access denied. No token provided')
    }

    try {
        // Eventually we replace the PrivateKey with env var
        // returns payload
        const payload = jwt.verify(token, 'jwtPrivateKey')   
        req.user = payload
        next()
    }
    catch (ex) {
        res.status(400).send('Invalid token')
    }
}

module.exports = auth