const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const profileRoute = require("./routes/profile");
const walletRoute = require("./routes/wallet");

// Enable .env file
dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to Database");
  }
);

// Middleware
app.use(express.json());

// Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/user/profile", profileRoute);
app.use("/api/user/wallet", walletRoute);

app.listen(3000, () => {
  console.log("Server up and running! http://localhost:3000");
});
