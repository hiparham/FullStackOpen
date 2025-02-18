const Blog = require("../models/BlogModel");
const GetAllPosts = async () => {
  const response = await Blog.find({});
  return response;
};

module.exports = { GetAllPosts };
