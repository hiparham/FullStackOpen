const { test, beforeEach, after } = require("node:test");
const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const ConnectDb = require("../utils/ConnectDB");
const app = require("../app");
const api = supertest(app);
//
beforeEach(async () => {
  await ConnectDb();
  await User.deleteMany({});
  const pwHash = await bcrypt.hash("legituser", 10);
  await User.create({
    username: "legituser",
    name: "legit",
    passwordHash: pwHash,
  });
});
//
test("Bad Username", async () => {
  await api
    .post("/api/users")
    .send({ username: "hi", password: "hellomate", name: "hibad" })
    .expect(400);
});
//
test("Bad Password", async () => {
  await api
    .post("/api/users")
    .send({ username: "greatuser", password: "", name: "hibad" })
    .expect(400);
});
//
test("User Exists", async () => {
  await api
    .post("/api/users")
    .send({ username: "legituser", password: "legituser", name: "hibad" })
    .expect(400);
});
//
after(async () => {
  await mongoose.connection.close();
});
