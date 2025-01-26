export default function DisplayPersons({ personsToShow, DeletePerson }) {
  return (
    <ul className="mt-[3rem] flex flex-col gap-[2rem]">
      {personsToShow.map((person) => {
        return (
          <li
            key={person.id}
            className="flex items-center gap-[1rem] py-5 px-2 shadow-md rounded-md justify-between"
          >
            <p>
              <span className="font-semibold">{person.name}</span> 
              <span className="text-blue-500 ml-[.5rem]">{person.number}</span>
            </p>
            <img
              src="/Delete.svg"
              alt="Delete Icon"
              className="cursor-pointer w-[25px] object-cover"
              onClick={() => DeletePerson(person.id)}
            />
          </li>
        );
      })}
    </ul>
  );
}
