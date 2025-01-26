import { postPhoneNumber, updateNumber } from "../Helpers/PhoneBookFunctions";
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
        updateNumber(userExists.id, { ...userExists, number: personNum }).then(
          (data) => {
            setPersons(persons.map((x) => (x.id === userExists.id ? data : x)));
          }
        );
      }
    } else {
      postPhoneNumber(newPerson).then((data) => {
        setPersons([...persons, data]);
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
