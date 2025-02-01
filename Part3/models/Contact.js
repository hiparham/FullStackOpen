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
        return /^\d{2,3}-\d{3,}$/.test(v);
      },
      message:
        "Insert A proper number, use hyphen to separate it",
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
