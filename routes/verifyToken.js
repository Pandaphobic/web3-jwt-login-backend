const jwt = require("jsonwebtoken")

module.exports = function auth(req, res, next) {
  // Attempt to retrieve token from header
  const token = req.header("auth-token")
  // Check if token presented
  if (!token) return res.status(401).send("Access Denied")

  // Check if presented token is valid
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  } catch (err) {
    res.status(400).send("Invalid Token")
  }
}
