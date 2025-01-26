import { useState } from "react";
import Form from "./Components/Form";
import FilterResult from "./Components/FilterResult";
import DisplayPersons from "./Components/DisplayPersons";
import Header from "./Components/Header";
import Wrapper from "./Components/Wrapper";

export default function App() {
  const [personName, setPersonName] = useState("");
  const [personNum, setPersonNum] = useState("");
  const [filteredNames, SetFilteredResults] = useState("");
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const personsToShow =
    filteredNames.length > 2
      ? persons.filter((x) =>
          x.name.toLowerCase().includes(filteredNames.toLowerCase())
        )
      : persons;
  //
  return (
    <Wrapper>
      <Header />
      <FilterResult SetFilteredResults={SetFilteredResults} />
      <Form
        persons={persons}
        personName={personName}
        personNum={personNum}
        setPersonName={setPersonName}
        setPersonNum={setPersonNum}
        setPersons={setPersons}
      />
      <DisplayPersons personsToShow={personsToShow} />
    </Wrapper>
  );
}
