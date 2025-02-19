import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addpostdispatch, cleanUp, successNotif } from "../store/BlogStore";
export default function AddBlogPost() {
  const dispatch = useDispatch();
  const notif = useSelector((state) => state.Notification);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  async function sendPost(e) {
    e.preventDefault();
    let errors = [];
    if (title.length < 3) {
      errors.push("Blog title must be 3+ characters");
    }
    if (!url) {
      errors.push("URL Must exist");
    }
    if (!author) {
      errors.push("Author Must exist");
    }
    setError(errors);
    if (errors.length > 0) {
      setTimeout(() => {
        setError([]);
      }, 2000);
      return;
    }
    try {
      // Try Block
      dispatch(addpostdispatch({ title, url, author }));
      dispatch(successNotif(`${title} added!!`));
      setTimeout(() => {
        dispatch(cleanUp());
      }, 2000);
      setError([]);
      setTitle("");
      setAuthor("");
      setUrl("");
      setShowForm(false);
    } catch {
      // Catch Block
      setError(["Something went wrong"]);
    }
  }
  const toggleFormVisibility = () => setShowForm(!showForm);
  return (
    <div className="my-[3rem]">
      {error.length > 0 && (
        <div>
          {error.map((txt) => {
            return (
              <li key={txt} className="list-none">
                <p
                  key={txt}
                  className="text-center text-red-500 font-semibold mb-[1rem]"
                >
                  {txt}
                </p>
              </li>
            );
          })}
        </div>
      )}
      {notif && (
        <p
          className={`text-white py-2 text-center ${
            notif.success ? "bg-emerald-400" : "bg-red-500"
          }`}
        >
          {notif.text}
        </p>
      )}
      {!showForm && (
        <button
          className="font-semibold text-xl cursor-pointer  py-3 px-12 rounded-md bg-sky-500 w-full block text-white"
          onClick={toggleFormVisibility}
        >
          Create New Post
        </button>
      )}
      {showForm && (
        <>
          <form
            onSubmit={sendPost}
            className="mt-[2rem] flex flex-col gap-[1rem]"
          >
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              type="text"
              placeholder="Title"
              className="py-5 px-3 border rounded-md border-zinc-300 block w-full"
            />
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              type="text"
              placeholder="Author"
              className="py-5 px-3 border rounded-md border-zinc-300 block w-full"
            />
            <input
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              type="text"
              placeholder="URL"
              className="py-5 px-3 border rounded-md border-zinc-300 block w-full"
            />
            <button
              type="submit"
              className="bg-sky-500 text-white py-3 rounded-md cursor-pointer"
            >
              Add Blog Post
            </button>
            <button
              className="bg-red-500 text-white py-3 rounded-md cursor-pointer"
              onClick={toggleFormVisibility}
            >
              Cancel
            </button>
          </form>
        </>
      )}
    </div>
  );
}
