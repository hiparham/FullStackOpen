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


test("Checking New Blog Form | Exercise 5.16",async()=>{

})