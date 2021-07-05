const { number } = require("@hapi/joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },

  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },

  password: {
    type: String,
    required: true,
    max: 1024,
    min: 20,
  },

  walletAddress: {
    type: String,
    required: true,
    min: 42,
    max: 42,
  },

  nonce: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
