const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    default: null,
    type: String,
  },
});

const Author = mongoose.model("Author", schema);
module.exports = Author;
