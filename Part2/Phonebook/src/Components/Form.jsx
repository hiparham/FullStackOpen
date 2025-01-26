import axios from "axios";
export default function Form({
  persons,
  setPersonNum,
  setPersonName,
  personName,
  personNum,
  setPersons,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    const newPerson = {
      id: persons.length + 1,
      name: personName,
      number: personNum,
    };
    const userExists = persons.find(
      (x) => x.name.toLowerCase().trim() === personName.toLowerCase().trim()
    );
    if (userExists) {
      if (
        window.confirm(
          `${userExists.name} already exists, you want to edit the number?`
        )
      ) {
        const newPersons = persons.map((x) =>
          x.name === newPerson.name ? newPerson : x
        );
        setPersons(newPersons);
      }
    } else {
      axios.post("http://localhost:3001/persons", newPerson).then(() => {
        setPersons([...persons, newPerson]);
      });
    }
    // Cleaning Up
    setPersonName("");
    setPersonNum("");
    e.target.reset();
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Contact Name"
        value={personName}
        onChange={(e) => setPersonName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Contact Number"
        value={personNum}
        onChange={(e) => setPersonNum(e.target.value)}
      />
      <button type="submit">Add Contact</button>
    </form>
  );
}
