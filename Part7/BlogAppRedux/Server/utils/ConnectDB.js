const mongoose = require("mongoose");
const { MONGO } = require("./config");

const ConnectDb = async () => {
  await mongoose.connect(MONGO);
};
module.exports = ConnectDb;
