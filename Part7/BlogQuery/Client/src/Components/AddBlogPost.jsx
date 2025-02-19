import { useState } from "react";
export default function AddBlogPost({ postAdded }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  function sendPost(e) {
    e.preventDefault();
    postAdded({ title, url, author });
    setTitle("");
    setAuthor("");
    setUrl("");
    setShowForm(false);
  }
  const toggleFormVisibility = () => setShowForm(!showForm);
  return (
    <div className="my-[3rem]">
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
