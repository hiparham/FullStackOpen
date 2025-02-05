const User = require("../models/User");
const bcrypt = require("bcrypt");
const Router = require("express").Router();
// Fetching Users
Router.get("/", async (req, res) => {
  const Users = await User.find({}).populate("blogs", {
    url: 1,
    author: 1,
    title: 1,
    id: 1,
  });
  if (Users.length > 0) {
    return res.json(Users);
  } else {
    return res.status(404).json({ message: "No User Found" });
  }
});
// Creating A New User
Router.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  // Check if A field is missing
  if (password.length < 5) {
    return res
      .status(400)
      .json({ message: "Password Must be 3+ characters long" });
  }
  //
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, name, passwordHash });
  const userCreated = await user.save();
  return res.status(201).json(userCreated);
});
//
module.exports = Router;
