const Blog = require("../models/BlogModel");
const Router = require("express").Router();
// Get All Blogs
Router.get("/", async (req, res) => {
  const AllItems = await Blog.find({});
  if (!AllItems) {
    return res.status(501).json({ message: "No posts yet" });
  }
  return res.json(AllItems);
});
// Fetching A single blog
Router.get("/:id", async (req, res) => {
  const blogPost = await Blog.findById(req.params.id);
  if (!blogPost) {
    return res.status(404).json({ message: "Post not found" });
  }
  return res.json(blogPost);
});
// Post A Blog
Router.post("/", async (req, res, next) => {
  const { title, url, author } = req.body;
  const newBlog = new Blog({ title: title, url: url, author: author });
  try {
    const submittedPost = await newBlog.save();
    return res.status(201).json(submittedPost);
  } catch (error) {
    next(error);
  }
});
//
module.exports = Router;
