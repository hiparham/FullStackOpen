const User = require("../models/User");
const bcrypt = require("bcrypt");
const Router = require("express").Router();
Router.get("/:id", async (req, res) => {
  const foundUser = await User.findById(req.params.id);
  return res.json(foundUser);
});
// Creating A New User
Router.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  // Check if A field is missing
  if (!username || !name || !password) {
    return res
      .status(400)
      .json({ message: "Username, name, and password must exist" });
  }
  if (password.length < 5) {
    return res
      .status(400)
      .json({ message: "Password Must be 5+ characters long" });
  }
  //
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, name, passwordHash });
  const userCreated = await user.save();
  const indexes = await User.collection.getIndexes();
  return res.status(201).json(indexes);
});
//
module.exports = Router;
