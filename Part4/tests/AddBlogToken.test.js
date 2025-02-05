// Testing If Posting Works after adding token-based authentication
const { test, beforeEach, after } = require("node:test");
const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const ConnectDb = require("../utils/ConnectDB");
const app = require("../app");
const api = supertest(app);