require("dotenv").config();
const MONGO = process.env.MONGO_URI;
const PORT = process.env.PORT;

module.exports = { MONGO, PORT };
