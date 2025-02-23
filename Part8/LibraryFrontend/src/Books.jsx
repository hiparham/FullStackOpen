import { useQuery } from "@apollo/client";
import { GetAllBooks } from "./Queries";
import { useState } from "react";
import Filtergenre from "./Filtergenre";
import FavoriteBooks from "./FavoriteBooks";

export default function Books() {
  const [currentGenre, setCurrentGenre] = useState("");
  const { data, loading } = useQuery(GetAllBooks, {
    variables: { genre: currentGenre },
  });

  return (
    <div>
      <Filtergenre setCurrentGenre={setCurrentGenre} />
      <div className="grid grid-cols-3">
        <h2 className="font-bold text-lg">Title</h2>
        <h2 className="font-bold text-lg">Published</h2>
        <h2 className="font-bold text-lg">Author</h2>
      </div>
      {loading && <h1 className="text-center py-[10vh]">Loading</h1>}
      {data && data.allBooks && (
        <ul className="flex flex-col gap-[1rem] py-5">
          {data.allBooks.map((book) => {
            return (
              <li key={book.id} className="grid grid-cols-3">
                <p>{book.title}</p>
                <p>{book.published}</p>
                <p>{book.author.name}</p>
              </li>
            );
          })}
        </ul>
      )}
      <FavoriteBooks />
    </div>
  );
}
