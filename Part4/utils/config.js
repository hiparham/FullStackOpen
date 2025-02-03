require("dotenv").config();
const MONGO =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_MOCK
    : process.env.MONGO_URI;
//
const PORT = process.env.PORT;

module.exports = { MONGO, PORT };
