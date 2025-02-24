const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
  },
  published: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  genres: [
    {
      type: String,
    },
  ],
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
