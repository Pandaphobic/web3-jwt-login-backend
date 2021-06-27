const router = require("express").Router();
const User = require("../model/User")

// Validation
const Joi = require('@hapi/joi')

const joiSchema = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(20).required()
}) 

router.post('/register', async (req, res)=>{
  
  // Validate before making a user
  const { error } = joiSchema.validate(req.body)
  if(error) {return res.status(400).send(error.details[0].message)}

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  try {
    const savedUser = await user.save()
    res.send(savedUser)
  } catch(err){
    res.status(400).send(err)
  }
})

router.post('/login', (req, res)=>{
  res.send("Login");
})

module.exports = router