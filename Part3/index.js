const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
app.use(cors());
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: "5",
    name: "Node Js Master",
    number: "39-23-6423122",
  },
];
// Morgan Configuration
app.use(morgan("tiny"));
morgan.token("logger", (req) => {
  return JSON.stringify(req.body);
});
app.post("*", morgan(":logger :method :url"));
//
// Serving Static files
app.use(express.static("dist"));
// Getting information
app.get("/info", (req, res) => {
  const date = new Date().toDateString();
  const HTML = `Phonebook has info for ${persons.length} people <br/> ${date}`;
  res.send(HTML);
});
// Getting all resources
app.get("/api/persons", (req, res) => {
  res.json(persons);
});
// Getting single resource
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const itemFind = persons.find((x) => x.id === id);
  if (!itemFind) {
    return res.status(404).end();
  }
  res.json(itemFind);
});
// Deleting Single Resource
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const itemFind = persons.find((x) => x.id === id);
  if (!itemFind) {
    return res.status(400).json({ message: "phonenumber does not exist" });
  }
  persons = persons.filter((x) => x.id !== id);
  res.status(204).end();
});
// Adding a phone number
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ message: "Name & Number must exist." });
  }
  const exists = persons.find(
    (x) => x.name.trim().toLowerCase() === name.trim().toLowerCase()
  );
  if (exists) {
    return res.status(400).json({ message: "Contact already exists." });
  }
  const newNumber = {
    id: String(Math.round(Math.random() * 1022)),
    name,
    number,
  };
  persons = [...persons, newNumber];
  res.json(newNumber);
});
// Running the server.
app.listen(process.env.PORT);
