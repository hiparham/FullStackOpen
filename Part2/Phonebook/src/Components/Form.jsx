import { postPhoneNumber, updateNumber } from "../Helpers/PhoneBookFunctions";
export default function Form({
  persons,
  setPersonNum,
  setPersonName,
  personName,
  personNum,
  setPersons,
  setNotif,
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
        updateNumber(userExists.id, { ...userExists, number: personNum })
          .then((data) => {

            setPersons(persons.map((x) => (x.id === userExists.id ? data : x)));
            setNotif({ type: "success", message: "contact number changed." });
            setTimeout(() => {
              setNotif("");
            }, 1000);
          })
          .catch(() => {
            setNotif({ type: "success", message: "something went wrong." });
            setTimeout(() => {
              setNotif("");
            }, 1000);
          });
      }
    } else {
      postPhoneNumber(newPerson).then((data) => {

        setPersons([...persons, data]);
        setNotif({ type: "success", message: "contact added." });
        setTimeout(() => {
          setNotif("");
        }, 1000);
      });
    }
    // Cleaning Up
    setPersonName("");
    setPersonNum("");
    e.target.reset();
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[1rem] md:grid grid-cols-5 md:gap-[.25rem]"
    >
      <input
        type="text"
        placeholder="Contact Name"
        value={personName}
        onChange={(e) => setPersonName(e.target.value)}
        className="py-3 px-2 border border-emerald-200 col-start-1 col-end-3"
      />
      <input
        type="text"
        placeholder="Contact Number"
        value={personNum}
        onChange={(e) => setPersonNum(e.target.value)}
        className="py-3 px-2 border border-emerald-200 col-start-3 col-end-5"
      />
      <button
        type="submit"
        className="cursor-pointer bg-sky-500 text-white py-3 font-semibold text-[1.05rem] col-start-5 col-end-6"
      >
        Add Contact
      </button>
    </form>
  );
}
