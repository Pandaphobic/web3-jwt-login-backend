// Validation
const Joi = require("@hapi/joi");

/* -> TODO <-
  [] - regis+login Change to validate wallet address
  [] - 

*/

// Register Validation
const registerValidation = data => {
  const joiSchema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().min(6).required().email(),
    walletAddress: Joi.string().min(42).required(),
    password: Joi.string().min(20).required(),
  });
  // Validate before making a user
  return joiSchema.validate(data);
};

// Login Validation
const loginValidation = data => {
  const joiSchema = Joi.object({
    email: Joi.string().min(6).email(),
    walletAddress: Joi.string().min(42),
    password: Joi.string().min(20).required(),
  }).xor("email", "walletAddress");
  // Validate before logging in user
  return joiSchema.validate(data);
};

// Login Validation
const walletValidation = data => {
  const joiSchema = Joi.object({
    walletAddress: Joi.string().min(42),
  });
  // Validate before logging in user
  return joiSchema.validate(data);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.walletValidation = walletValidation;
