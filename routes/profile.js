const router = require("express").Router()
const verify = require("./verifyToken")
const User = require("../model/User")

// If authenticated, return entire user information for ID specified

/*
TODO:
 - Only retrieve owned sensitive information
 - Error handling
*/
module.exports = router.post("/:userID", verify, async (req, res) => {
  // Check if user alerady exists
  const emailExists = await User.findOne({
    _id: req.params.userID
  })
  if (emailExists) return res.status(200).send(emailExists)
})
