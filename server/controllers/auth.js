const user =  require('../models/user')
const jwt =  require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } =  require('../validation/validation')

module.exports.register = async (req, res) => {
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const loginExist = await user.findOne({login: req.body.login})
    if(loginExist) return res.status(400).send('Login уже занят')

    const salt = bcrypt.genSaltSync(10)

    try {
        const userItem = new user({
            login: req.body.login,
            password: bcrypt.hashSync(req.body.password, salt)
        })
        const saveUser =  await userItem.save()
        res.status(200).json({user: user._id})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.login = async (req, res) => {
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const userAuth = await user.findOne({login: req.body.login})
    if(!userAuth) return res.status(400).send('Неверный login')

    const validPass =  await bcrypt.compare(req.body.password, userAuth.password)
    if(!validPass) return res.status(400).send('Неверный пароль')
    try {
        const token = jwt.sign({_id: userAuth._id}, process.env.TOKEN_SECRET )
        res.header('auth-token', token).send(token)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}