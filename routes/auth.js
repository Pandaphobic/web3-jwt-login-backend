const router = require("express").Router()
const User = require("../model/User")
const { registerValidation, loginValidation } = require("../validation")
const bcrypt = require("bcryptjs")

// Registration
router.post("/register", async (req, res) => {
  // Validation
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Check if user alerady exists
  const emailExists = await User.findOne({
    email: req.body.email
  })
  if (emailExists) return res.status(400).send("Email already exists!")

  // Hash the password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  // Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  })
  try {
    const savedUser = await user.save()
    res.send({ user: user._id })
  } catch (err) {
    res.status(400).send(err)
  }
})

// Login
router.post("/login", async (req, res) => {
  // Validation
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Check if user alerady exists
  const user = await User.findOne({
    email: req.body.email
  })
  if (!user) return res.status(400).send("Email incorrect.")
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send("Password incorrect")

  res.send("Logged in!")
})

module.exports = router
