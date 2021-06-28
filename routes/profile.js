const router = require("express").Router()
const verify = require("./verifyToken")
const User = require("../model/User")

// If authenticated, return entire user information for ID specified

/*
TODO:
 - Only retrieve owned sensitive information
 - Error handling
*/
module.exports = router.get("/:userID", verify, async (req, res) => {
  // Get userID of request
  const reqUserId = req.user._id

  // Check if user alerady exists
  const idExists = await User.findOne({
    _id: req.params.userID
  })
  // If requesting user is the the same as the one we're getting
  // return all the information. Else: Access Denied
  if (idExists._id == reqUserId) return res.status(200).send(idExists)
  else return res.status(401).send("Access Denied")
})
