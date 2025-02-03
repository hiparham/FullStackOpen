const Router = require("express").Router();
const { Person } = require("../models/Contact");
//
Router.get("/", async (req, res) => {
  try {
    const AllPersons = await Person.find({});
    return res.status(200).json(AllPersons);
  } catch {
    return res.status(404).json({ message: "No Contacts found" });
  }
});
//
Router.get("/:id", async (req, res, next) => {
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
Router.post("/", async (req, res, next) => {
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
Router.put("/:id", async (req, res, next) => {
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
Router.delete("/:id", async (req, res, next) => {
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
module.exports = Router;
