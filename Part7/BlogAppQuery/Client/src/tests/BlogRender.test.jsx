import { render, screen } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";
import { useState } from "react";
import Heart from "../assets/heart.svg";
import userEvent from "@testing-library/user-event";
export default function Blogpost({ post, likePost }) {
  const [show, setShow] = useState(false);
  return (
    <li key={post.title}>
      <div className="flex items-center justify-between">
        <h3 data-testid="title" className="font-semibold capitalize">
          {post.title}
        </h3>
        <button
          onClick={() => setShow(!show)}
          data-testid="showBlog"
          className="cursor-pointer shadow-md py-2 px-5 rounded-md bg-white"
        >
          {show ? "Hide Info" : "Display Info"}
        </button>
      </div>
      {show && (
        <div className="my-[2rem] px-2 flex flex-col gap-[.8rem]">
          <a
            href={post.url}
            target="_blank"
            className="text-blue-500"
            data-testid="url"
          >
            Browse Post
          </a>
          <p data-testid="likes">Likes : {post.likes}</p>
          <p data-testid="auth">By {post.author}</p>
          <button
            data-testid="likebtn"
            onClick={likePost}
            className="mt-[1rem] cursor-pointer w-[60px] h-[60px] rounded-full  flex justify-center items-center shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
          >
            <img src={Heart} alt="like icon" className="max-w-[30px]" />
          </button>
          <button className="bg-red-500 rounded-md py-3 text-white font-semibold w-full block cursor-pointer mt-[1rem]">
            Delete Post
          </button>
        </div>
      )}
    </li>
  );
}

function AddBlogPost({ postAdded }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  function sendPost(e) {
    e.preventDefault();
    postAdded({ title, author, url });
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

beforeEach(() => {
  const myPost = {
    title: "Post title",
    author: "Some Author",
    url: "google.com",
    likes: 0,
  };
  render(<Blogpost post={myPost} />);
});

test("BlogRender | Exercise 5.13", () => {
  const blogtitle = screen.queryByTestId("title");
  expect(blogtitle).toBeDefined();
  const url = screen.queryByTestId("url");
  expect(url).toBeNull();
  const author = screen.queryByTestId("auth");
  expect(author).toBeNull();
  const likes = screen.queryByTestId("likes");
  expect(likes).toBeNull();
});

test("BlogShow | Exercise 5.14", async () => {
  const User = userEvent.setup();
  const showButton = screen.getByTestId("showBlog");
  // After Clicking ...
  await User.click(showButton);
  const likesCount = screen.getByTestId("likes");
  expect(likesCount).toBeDefined();
  const url = screen.getByTestId("url");
  expect(url).toBeDefined();
});

test("Like Count | Exercise 5.15", async () => {
  const User = userEvent.setup();
  const fn = vi.fn();
  const myPost = {
    title: "Likes Counter",
    author: "Love",
    url: "google.com",
    likes: 0,
  };
  render(<Blogpost post={myPost} likePost={fn} />);
  const btn = screen.getAllByTestId("showBlog")[1];
  await User.click(btn);
  const like = screen.getByTestId("likebtn");
  await User.click(like);
  await User.click(like);
  expect(fn.mock.calls.length).toBe(2);
});

test("Checking New Blog Form | Exercise 5.16", async () => {
  const exampleObject = {
    title: "Title Here",
    author: "Good Author",
    url: "vitest.com",
  };
  const User = userEvent.setup();
  const mock = vi.fn();
  render(<AddBlogPost postAdded={mock} />);
  await User.click(screen.getByText("Create New Post"));
  const submitBtn = screen.getByText("Add Blog Post");
  const titleInput = screen.getByPlaceholderText("Title");
  const authorInput = screen.getByPlaceholderText("Author");
  const urlInput = screen.getByPlaceholderText("URL");
  await User.type(titleInput, "Title Here");
  await User.type(authorInput, "Good Author");
  await User.type(urlInput, "vitest.com");
  await User.click(submitBtn);
  const postCreated = mock.mock.calls[0][0];
  expect(postCreated).toStrictEqual(exampleObject);
});
