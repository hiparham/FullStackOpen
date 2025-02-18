const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username Must Exist"],
    minLength: [3, "User Should be 3 characters long"],
    unique: [true, "Username Exists"],
  },
  name: {
    type: String,
    required: [true, "Name Must Exist"],
  },
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});
//
UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
    return returnedObject;
  },
});
//
const User = mongoose.model("User", UserSchema);
//
module.exports = User;
