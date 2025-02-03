const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const ConnectDb = require("../utils/ConnectDB");
const api = supertest(app);
const Blog = require("../models/BlogModel");
const initialBlogs = [
  {
    title: "mongoose errors explained",
    author: "mongoose docs",
    url: "https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.Error()",
  },
  {
    title: "mongoose guides",
    author: "mongoose docs",
    url: "https://mongoosejs.com/docs/guides.html",
  },
];
//
beforeEach(async () => {
  await ConnectDb();
  await Blog.deleteMany({});
  const Notes = initialBlogs.map((x) => new Blog(x));
  await Promise.all(Notes.map((post) => post.save()));
});
//
test("Fetching All Posts", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
//
test("Body Length", async () => {
  const All = await api.get("/api/blogs");
  assert.strictEqual(All.body.length, initialBlogs.length);
});
//
test("Single Post Fetch", async () => {
  const foundItem = await Blog.findOne({ title: initialBlogs[0].title }).exec();
  assert(initialBlogs.map((x) => x.title).includes(foundItem.title));
});
//
test("unique Identifier check", async () => {
  const AllPosts = await api.get("/api/blogs");
  const idExists = AllPosts._body;
  assert(idExists.map((x) => x.id).every((x) => x));
});
//
test("Post Request", async () => {
  await api.post("/api/blogs").send({
    title: "Some Dumb Blog Post",
    author: "Node Testing",
    url: "Nodejs Documentation",
  });
  const fetchAll = await Blog.find({});
  assert.strictEqual(initialBlogs.length + 1, fetchAll.length);
});
//
test("LikesMissing", async () => {
  const postCreate = {
    title: "A post without like properties",
    author: "Me, myself",
    url: "No URL YET",
  };
  const checkLikes = await api
    .post("/api/blogs")
    .send(postCreate)
    .then((x) => {
      return x._body.likes;
    });
  assert(checkLikes !== undefined);
});
//
test("MissingFields", async () => {
  await api.post("/api/blogs").send({ author: "Me" }).expect(400);
});
//
after(async () => {
  await mongoose.connection.close();
});
