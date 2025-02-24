import { useMutation, useQuery } from "@apollo/client";
import { editAuthor, getAllAuthors } from "./Queries";
import { useState } from "react";

export default function SetBirthForm() {
  const [err, setErr] = useState("");
  const { data } = useQuery(getAllAuthors);
  const [toggleBirth] = useMutation(editAuthor, {
    refetchQueries: [{ query: getAllAuthors }],
  });
  function handleSub(e) {
    e.preventDefault();
    const value = e.target.person.value;
    const year = e.target.yr.value;
    if (value === "choose" || !year || isNaN(year)) {
      setErr("Choose Author name & Add Birth Year");
      setTimeout(() => {
        setErr("");
      }, 1500);
      return;
    }
    toggleBirth({ variables: { name: value, year: year } });
    e.target.reset();
  }

  return (
    <div>
      <h1 className="my-[2rem] text-center font-semibold capitalize text-lg">
        Set Birthyear
      </h1>
      <p className="text-red-500 font-semibold py-2 text-center min-h-[35px]">
        {err}
      </p>
      <form
        onSubmit={handleSub}
        className="flex flex-col md:grid grid-cols-3 gap-[.5rem]"
      >
        <select
          name="person"
          className="py-2 bg-zinc-100 px-1"
          defaultValue="choose"
        >
          <option value="choose" disabled>
            Choose An Author
          </option>
          {data && data.allAuthors && (
            <>
              {data.allAuthors.map((author) => {
                return (
                  <option value={author.name} key={author.id}>
                    {author.name}
                  </option>
                );
              })}
            </>
          )}
        </select>
        <input
          type="text"
          name="yr"
          placeholder="Year Of Birth"
          className="py-2 bg-zinc-100 px-1"
        />
        <button className="bg-black text-white cursor-pointer">
          Change Year
        </button>
      </form>
    </div>
  );
}
