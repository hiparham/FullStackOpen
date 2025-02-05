const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
//
Router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const passwordHash = !(username && password)
    ? false
    : await bcrypt.compare(password, user.passwordHash);
  if (!passwordHash) {
    return res.status(401).json({ message: "Invalid Username Or Password" });
  }
  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.JWT_SECRET
  );
  res.status(200).json({ token, username: user.username, name: user.name });
});
//
module.exports = Router;
