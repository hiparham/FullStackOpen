import { useQuery } from "@apollo/client";
import { getAllAuthors } from "./Queries";

export default function Authors() {
  const { data } = useQuery(getAllAuthors);
  const allAuthors = data?.allAuthors;
  return (
    <div>
      <div className="grid grid-cols-3">
        <h2 className="font-bold text-lg">Name</h2>
        <h2 className="font-bold text-lg">Books</h2>
        <h2 className="font-bold text-lg">Born In</h2>
      </div>
      {allAuthors && (
        <ul className="flex flex-col gap-[1rem] py-5">
          {allAuthors.map((author) => {
            return (
              <li key={author.id} className="grid grid-cols-3">
                <p>{author.name}</p>
                <p>{author.bookCount}</p>
                <p>{author.born || "Unknown"}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
