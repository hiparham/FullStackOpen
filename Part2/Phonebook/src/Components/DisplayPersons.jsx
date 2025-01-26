export default function DisplayPersons({personsToShow}) {
  return (
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
  );
}
