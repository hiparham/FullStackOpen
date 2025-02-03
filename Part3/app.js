const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const PersonsRouter = require("./controllers/PersonsRouter");
const { UnknownEndpoint, errorHandler } = require("./utils/Middleware");
app.use(express.json());
app.use(cors());
// Morgan
app.use(morgan("tiny"));
morgan.token("logger", (req) => {
  return JSON.stringify(req.body);
});
app.post("*", morgan(":logger :method :url"));
// Serving Static files ( React App )
app.use(express.static("dist"));
// Using Router
app.use("/api/persons", PersonsRouter);
//
app.use(UnknownEndpoint);
app.use(errorHandler);
//
module.exports = app;
