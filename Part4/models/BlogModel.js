const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Is required"],
  },
  author: {
    type: String,
    default: "Unknown Author",
  },
  url: {
    type: String,
    required: [true, "Add the Post url"],
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

BlogSchema.set("toJSON", {
  transform: (doc, newObject) => {
    newObject.id = doc._id.toString();
    delete newObject.__v;
    delete newObject._id;
    return newObject;
  },
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
