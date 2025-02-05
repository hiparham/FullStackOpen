const Blog = require("../models/BlogModel");
const User = require("../models/User");
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
Router.post("/", async (req, res) => {
  const { title, url, author, user } = req.body;
  const UserFound = await User.findById(user);
  const newBlog = new Blog({
    title: title,
    url: url,
    author: author,
    user: UserFound._id,
  });
  const submittedPost = await newBlog.save();
  UserFound.blogs = UserFound.blogs.concat(submittedPost._id);
  await UserFound.save();
  return res.status(201).json(submittedPost);
});
// Deleting A post
Router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});
// Editing A Post
Router.put("/:id", async (req, res) => {
  const updated = req.body;
  const itemUpdated = await Blog.findByIdAndUpdate(req.params.id, updated, {
    runValidators: true,
    new: true,
  });
  return res.status(200).json(itemUpdated);
});
//
module.exports = Router;
