import express from "express";
const app = express();
const cors = require("cors");
app.use(cors());
app.get("/api/ping", (_req, res) => {
  res.send("pong!");
});
app.listen(3001, () => {
  console.log("Server running");
});
