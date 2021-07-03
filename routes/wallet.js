const router = require("express").Router();
const User = require("../model/User");

// Used to return wallet Address and Nonce
module.exports = router.get("/:walletAddress", async (req, res) => {
  // Get userID of request
  const reqWalletId = req.params.walletAddress;

  // Check if wallet alerady exists
  try {
    const walletExists = await User.findOne({
      walletAddress: req.params.walletAddress,
    });
    // If requesting user is the the same as the one we're getting
    // return all the information. Else: Access Denied
    if (walletExists.walletAddress == reqWalletId)
      return res.status(200).send(walletExists);
    else return res.status(401).send("Access Denied");
  } catch (err) {
    res.status(404).send(`User does not exist`);
  }
});
