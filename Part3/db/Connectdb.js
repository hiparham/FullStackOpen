const mongoose = require("mongoose");
const { MONGO } = require("../utils/config");
async function ConnectDb() {
  await mongoose.connect(MONGO);
}
module.exports=ConnectDb