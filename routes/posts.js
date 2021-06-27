const router = require("express").Router()
const verify = require("./verifyToken")

router.get("/", verify, (req, res) => {
  res.json({
    posts: {
      title: "first post title",
      description: "private date that you should only be able to see once authenticated as the owner"
    }
  })
})
module.exports = router
