const router = require("express").Router()
const User = require("../model/User")
const { registerValidation, loginValidation } = require("../utils/validation")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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
    password: hashPassword,
    walletAddress: req.body.walletAddress
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
  const user = await User.findOne({ $or: [{ email: req.body.email }, { walletAddress: req.body.walletAddress }] }).exec(async function (err, user) {
    //no users with that email NOR walletAddress exist.
    if (!user) return res.status(400).send("Login incorrect.")
    //user already exists with email AND/OR walletAddress.
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send("Password incorrect")
    // Upon Successful Login
    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header("auth-token", token).send(token)
  })
})

module.exports = router
