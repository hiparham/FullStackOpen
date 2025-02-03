require("dotenv").config();

const MONGO = process.env.MONGO_URI;

const PORT = 3001;

module.exports = { MONGO, PORT };
