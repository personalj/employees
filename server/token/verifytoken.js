const jwt = require('jsonwebtoken')

module.exports = function(req,res,next) {
    const token =  req.header('auth-token')
    if(!token) return res.status(401).send('Доступ запрещен')
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.userAuth = verified
        next()
    }catch(e) {
        res.status(400).send('Неверный токен')
    }
}