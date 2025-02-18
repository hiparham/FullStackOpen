import { useState } from "react";
import { addBlogPost } from "../Helpers/BlogsHelper";

export default function AddBlogPost({ postAdded, info }) {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [notif, setNotif] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  async function sendPost(e) {
    e.preventDefault();
    try {
      const response = await addBlogPost(
        { title: title, url: url, author: author },
        info.token
      );
      postAdded(response);
      setNotif("Post Created");
      setTimeout(() => {
        setNotif("");
      }, 2000);
      setTitle("");
      setUrl("");
      setAuthor("");
      setShowForm(false);
    } catch (error) {
      setError("Post could not be created", error);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }
  const toggleFormVisibility = () => setShowForm(!showForm);
  return (
    <div className="my-[3rem]">
      {error && (
        <p className="text-center text-red-500 font-semibold mb-[1rem]">
          {error}
        </p>
      )}
      {notif && (
        <p className="text-center text-emerald-500 font-semibold mb-[1rem]">
          {notif}
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
              required={true}
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              type="text"
              placeholder="Title"
              className="py-5 px-3 border rounded-md border-zinc-300 block w-full"
            />
            <input
              required={true}
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              type="text"
              placeholder="Author"
              className="py-5 px-3 border rounded-md border-zinc-300 block w-full"
            />
            <input
              required={true}
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
