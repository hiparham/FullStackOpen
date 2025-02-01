const Blog = require("../models/BlogModel");
const Router = require("express").Router();
// Get All Blogs
Router.get("/", async (req, res) => {
  try {
    const AllItems = await Blog.find({});
    return res.json(AllItems);
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Server Error" });
  }
});
// Post A Blog
Router.post("/", async (req, res, next) => {
  const { title, url, author } = req.body;
  const newBlog = new Blog({ title: title, url: url, author: author });
  try {
    const submittedPost = await newBlog.save();
    return res.status(201).json(submittedPost);
  } catch (error) {
    console.log("ERROR");

    next(error);
  }
});
module.exports = Router;
