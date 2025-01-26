import { useState } from "react";
import Form from "./Components/Form";
import FilterResult from "./Components/FilterResult";
import DisplayPersons from "./Components/DisplayPersons";
import Header from "./Components/Header";
import Wrapper from "./Components/Wrapper";
import { useEffect } from "react";
import axios from "axios";
export default function App() {
  const [personName, setPersonName] = useState("");
  const [personNum, setPersonNum] = useState("");
  const [filteredNames, SetFilteredResults] = useState("");
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);
  //
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
