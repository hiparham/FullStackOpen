const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
const { errorHandler } = require("./helpers/ErrorHandler");
const { Person } = require("./Models");
const mongoose = require("mongoose");
app.use(cors());
// Morgan
app.use(morgan("tiny"));
morgan.token("logger", (req) => {
  return JSON.stringify(req.body);
});
app.post("*", morgan(":logger :method :url"));
// Serving Static files ( React App )
app.use(express.static("dist"));
//
// Getting Contacts
//
app.get("/api/persons", async (req, res) => {
  try {
    const AllPersons = await Person.find({});
    return res.status(200).json(AllPersons);
  } catch (error) {
    res.status(500).end();
  }
});
//
app.get("/api/persons/:id", async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Malformatted id." });
  }
  //
  try {
    const findItem = await Person.findById(req.params.id);
    if (findItem === null) {
      throw new Error("Nothing found.");
    } else {
      return res.status(200).json(findItem);
    }
  } catch (error) {
    return res.status(404).json({ message: "Nothing Found." });
  }
});
//
//
//
// Posting New Contact
app.post("/api/persons", async (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ message: "Name and number must exist." });
  }
  try {
    const addedContact = await Person.create({ name, number });
    return res.status(201).json(addedContact);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong." });
  }
});
//
//
//
// Updating Number
//
app.put("/api/persons/:id", async (req, res) => {
  if (!req.body.number) {
    return res.status(400).json({ message: "Number must exist." });
  }
  try {
    const itemFind = await Person.findById(req.params.id);
    await Person.findOneAndUpdate(
      {
        _id: itemFind._id,
      },
      { number: req.body.number }
    );
    return res.json({
      id: itemFind._id,
      name: itemFind.name,
      number: req.body.number,
    });
  } catch (error) {
    return res.status(400).json({ message: "Bad request." });
  }
});
//
//
// Removing Numbers
app.delete("/api/persons/:id", async (req, res) => {
  try {
    await Person.deleteOne({ _id: req.params.id });
    return res.status(200).json({ message: "contact deleted." });
  } catch (error) {
    return res.status(404).json({ message: "No contact found." });
  }
});
//
//
app.use(errorHandler);
// Running the server.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3001, () => {
      console.log("App Is Running");
    });
  })
  .catch(() => {
    process.exit(1);
  });
