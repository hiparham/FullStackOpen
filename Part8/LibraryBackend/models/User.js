const { default: mongoose } = require("mongoose");

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userschema);

module.exports = User;
