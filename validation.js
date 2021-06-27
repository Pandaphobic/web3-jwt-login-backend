// Validation
const Joi = require("@hapi/joi")

// Register Validation
const registerValidation = data => {
  const joiSchema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(20).required()
  })
  // Validate before making a user
  return joiSchema.validate(data)
}

const loginValidation = data => {
  const joiSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(20).required()
  })
  // Validate before making a user
  return joiSchema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
