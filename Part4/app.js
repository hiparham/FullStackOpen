const express = require("express");
const cors = require("cors");
require("express-async-errors");
const BlogRouter = require("./controllers/BlogRouter");
const { UnknownEndpoint, ErrorHandler } = require("./utils/middleware");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/blogs", BlogRouter);
//
app.use(UnknownEndpoint);
app.use(ErrorHandler);
//
module.exports = app;
