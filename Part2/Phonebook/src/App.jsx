import { useState, useEffect } from "react";
import Form from "./Components/Form";
import FilterResult from "./Components/FilterResult";
import DisplayPersons from "./Components/DisplayPersons";
import Header from "./Components/Header";
import Wrapper from "./Components/Wrapper";
import { deleteNumber, getAll } from "./Helpers/PhoneBookFunctions";
//
export default function App() {
  const [personName, setPersonName] = useState("");
  const [personNum, setPersonNum] = useState("");
  const [filteredNames, SetFilteredResults] = useState("");
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    getAll().then((response) => {
      setPersons(response);
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
  const DeletePerson = (id) => {
    deleteNumber(id).then((response) => {
      const oldItem = response.data.id;

      setPersons(persons.filter((x) => x.id !== oldItem));
    });
  };
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
      <DisplayPersons
        personsToShow={personsToShow}
        DeletePerson={DeletePerson}
      />
    </Wrapper>
  );
}
