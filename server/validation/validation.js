// Validation
const joi = require('@hapi/joi')

const registerValidation = (data) => {
    const schema = {
        login: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    }
    return joi.validate(data, schema)
}
const loginValidation = (data) => {
    const schema = {
        login: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    }
    return joi.validate(data, schema)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
