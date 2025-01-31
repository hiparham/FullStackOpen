const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
const { errorHandler } = require("./helpers/ErrorHandler");
const { Person } = require("./models/Contact");
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
  try {
    const findItem = await Person.findById(req.params.id);
    if (!findItem) {
      return res.status(404).json({ message: "Nothing found." });
    }
    return res.status(200).json(findItem);
  } catch (error) {
    next(error);
  }
});
//
// Posting New Contact
app.post("/api/persons", async (req, res, next) => {
  const NewContact = new Person({
    name: req.body.name,
    number: req.body.number,
  });
  //
  try {
    const addedContact = await NewContact.save();
    return res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
});
//
// Updating Number
//
app.put("/api/persons/:id", async (req, res, next) => {
  try {
    const itemFind = await Person.findById(req.params.id);
    if (!itemFind) {
      return res.status(404).json({ message: "No Contact Found." });
    }
    const newContact = await Person.findByIdAndUpdate(
      req.params.id,
      { number: req.body.number },
      { new: true, runValidators: true }
    );
    return res.json(newContact);
  } catch (error) {
    next(error);
  }
});
//
// Removing Numbers
app.delete("/api/persons/:id", async (req, res, next) => {
  try {
    const itemFind = await Person.findById(req.params.id);
    if (!itemFind) {
      return res.status(404).json({ message: "No Item Found." });
    } else {
      await Person.findByIdAndDelete(req.params.id);
      return res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
});
//
// Unknown Endpoint
app.use((req, res) => {
  return res.status(404).json({ message: "Unknown URL." });
});
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
