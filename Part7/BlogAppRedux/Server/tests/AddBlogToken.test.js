// Testing If Posting Works after adding token-based authentication
const { test, beforeEach, after } = require("node:test");
const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const ConnectDb = require("../utils/ConnectDB");
const app = require("../app");
const api = supertest(app);
beforeEach(async () => {
  await ConnectDb();
});
//
test("Proper Token Post", async () => {
  await api
    .post("/api/blogs")
    .send({
      content: "Testing From Vscode",
      url: "Supertest",
      author: "Supertest",
    })
    .set({
      authorization:
        "Bearer ShittyToken",
    })
    .expect(401)
});
//
after(async () => {
  await mongoose.connection.close();
});
