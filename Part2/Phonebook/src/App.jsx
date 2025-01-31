import { useState, useEffect } from "react";
import Form from "./Components/Form";
import FilterResult from "./Components/FilterResult";
import DisplayPersons from "./Components/DisplayPersons";
import Header from "./Components/Header";
import Wrapper from "./Components/Wrapper";
import { deleteNumber, getAll } from "./Helpers/PhoneBookFunctions";
import Notification from "./Components/Notification";
//
export default function App() {
  const [notif, setNotif] = useState("");
  const [personName, setPersonName] = useState("");
  const [personNum, setPersonNum] = useState("");
  const [filteredNames, SetFilteredResults] = useState("");
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch(() => {
        setNotif({
          type: "error",
          message: "Something went wrong, try again.",
        });
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
    deleteNumber(id)
      .then(() => {
        setPersons(persons.filter((x) => x.id !== id));
        setNotif({ type: "success", message: "contact deleted." });
        setTimeout(() => {
          setNotif("");
        }, 1000);
      })
      .catch(() => {
        setNotif({
          type: "error",
          message: `already deleted.`,
        });
        setTimeout(() => {
          setNotif("");
          setPersons(persons.filter((x) => x.id !== id));
        }, 1000);
      });
  };
  //
  return (
    <Wrapper>
      <Header />
      <Notification notif={notif} />
      <FilterResult SetFilteredResults={SetFilteredResults} />
      <Form
        persons={persons}
        personName={personName}
        personNum={personNum}
        setPersonName={setPersonName}
        setPersonNum={setPersonNum}
        setPersons={setPersons}
        setNotif={setNotif}
      />
      <DisplayPersons
        personsToShow={personsToShow}
        DeletePerson={DeletePerson}
      />
    </Wrapper>
  );
}
