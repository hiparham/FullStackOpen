import { useMutation } from "@apollo/client";
import { useState } from "react";
import { addNewBook, GetAllBooks } from "./Queries";
export default function NewBook() {
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [title, setTitle] = useState("");
  const [addBook] = useMutation(addNewBook, {
    refetchQueries: [{ query: GetAllBooks }],

    onCompleted: () => {
      setAuthor("");
      setPublished("");
      setTitle("");
      setGenre("");
      setGenres([]);
      setTimeout(() => {
        window.location.pathname = "/";
      }, 1500);
    },
  });
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const addMoreGenre = () => {
    if (genre.length < 1) return;
    setGenres([...genres, genre]);
    setGenre("");
  };

  async function handleSub(e) {
    e.preventDefault();
    await addBook({
      variables: {
        title: title,
        author: author,
        published: published,
        genres: genres,
      },
    });
  }
  return (
    <div>
      <h1 className="font-bold text-lg">Add A Book</h1>
      <form
        onSubmit={handleSub}
        className="flex flex-col gap-[1.5rem] py-[5vh]"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={published}
          onChange={(e) => setPublished(e.target.value)}
        />
        <div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Genres"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <button
              type="button"
              onClick={addMoreGenre}
              className="px-2 text-lg bg-black text-white cursor-pointer"
            >
              +
            </button>
          </div>
          {genres.length > 0 && (
            <ul className="max-w-sm w-full my-[.5rem] flex items-center gap-[.2rem]">
              {genres.map((genre) => (
                <li className="p-1 capitalize bg-sky-200 text-sm" key={genre}>
                  {genre}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          className="bg-black text-white cursor-pointer py-3"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
