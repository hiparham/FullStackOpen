const mongoose = require("mongoose");
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Contact Name Is Required"],
    minLength: [3, "Name has to be at least 3 characters"],
  },
  number: {
    type: String,
    required: [true, "Contact Number is Required"],
    minLength: [8, "Number must at least be 8 characters"],
    validate: {
      validator: (v) => {
        const finalString = v.split("-");
        return (
          v.includes("-") &&
          finalString.length >= 2 &&
          finalString[0].length >= 2 &&
          /\d/.test(finalString[1]) &&
          /\d/.test(finalString[0])
        );
      },
      message:
        "Numbers Must be formed into two parts separated by '-', first part should also have 2-3 numbers at least, and second part should also contain a number or more.",
    },
  },
});
PersonSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});
const Person = mongoose.model("Person", PersonSchema);

module.exports = { Person };
