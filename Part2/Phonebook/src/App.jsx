import { useState } from "react";
import Form from "./Components/Form";
import FilterResult from "./Components/FilterResult";

export default function App() {
  const [personName, setPersonName] = useState("");
  const [personNum, setPersonNum] = useState("");
  const [filteredNames, SetFilteredResults] = useState("");
  //
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  //
  const personsToShow =
    filteredNames.length > 2
      ? persons.filter((x) =>
          x.name.toLowerCase().includes(filteredNames.toLowerCase())
        )
      : persons;
  //
  return (
    <div className="max-w-screen-md mx-auto w-11/12 py-[5vh]">
      <h1 className="text-2xl text-center font-bold">Phonebook</h1>
      <FilterResult SetFilteredResults={SetFilteredResults} />
      <Form
        persons={persons}
        personName={personName}
        personNum={personNum}
        setPersonName={setPersonName}
        setPersonNum={setPersonNum}
        setPersons={setPersons}
      />
      <ul>
        {personsToShow.map((person) => {
          return (
            <li key={person.id}>
              <p>
                {person.name}- {person.number}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
