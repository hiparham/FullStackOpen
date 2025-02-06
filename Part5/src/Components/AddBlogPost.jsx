import { useState } from "react";
import { addBlogPost } from "../Helpers/BlogsHelper";

export default function AddBlogPost({ postAdded, info }) {
  const [error, setError] = useState("");
  const [notif, setNotif] = useState("");
  //
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
      postAdded({
        title: response.title,
        author: response.author,
        url: response.url,
      });
      setNotif("Post Created");
      setTimeout(() => {
        setNotif("");
      }, 2000);
      setTitle("");
      setUrl("");
      setAuthor("");
    } catch (error) {
      setError("Post could not be created");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }

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
      <h3 className="font-semibold text-xl">Create A New Post</h3>
      <form onSubmit={sendPost} className="mt-[2rem] flex flex-col gap-[1rem]">
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
      </form>
    </div>
  );
}
