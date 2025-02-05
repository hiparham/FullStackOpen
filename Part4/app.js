const express = require("express");
const cors = require("cors");
require("express-async-errors");
const BlogRouter = require("./controllers/BlogRouter");
const userRouter = require("./controllers/Users");
const loginRouter = require("./controllers/Login");
const {
  UnknownEndpoint,
  ErrorHandler,
  extractToken,
  userExtractor,
} = require("./utils/middleware");
const app = express();
app.use(cors());
app.use(express.json());
app.use(extractToken);
app.use("/api/blogs", userExtractor,BlogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(UnknownEndpoint);
app.use(ErrorHandler);
//
module.exports = app;
