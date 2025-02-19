import { useState } from "react";
import Heart from "../assets/heart.svg";
import { useDispatch } from "react-redux";
import { deletepostdispatch, likepostdispatch } from "../store/BlogStore";
export default function Blogpost({ post }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const currentUser =
    JSON.parse(localStorage.getItem("BlogAuth")).username || "";
  const currentToken = JSON.parse(localStorage.getItem("BlogAuth")).token || "";

  async function likePost() {
    const id = post.id;
    const likes = post.likes + 1;
    dispatch(likepostdispatch(id, { likes }, currentToken));
  }
  async function deletePost() {
    const id = post.id;
    dispatch(deletepostdispatch(id,currentToken));
  }
  if (!post) return null;
  return (
    <li key={post.title}>
      <div data-testid="post" className="flex items-center justify-between">
        <h3 className="title font-semibold capitalize">{post.title}</h3>
        <button
          onClick={() => setShow(!show)}
          className="info cursor-pointer shadow-md py-2 px-5 rounded-md bg-white"
        >
          {show ? "Hide Info" : "Display Info"}
        </button>
      </div>
      {show && (
        <div className="my-[2rem] px-2 flex flex-col gap-[.8rem]">
          <a href={post.url} target="_blank" className="text-blue-500">
            Browse Post
          </a>
          <p>Likes : {post.likes}</p>
          <p>By {post.author}</p>
          <button
            onClick={likePost}
            data-testid="likeButton"
            className="mt-[1rem] cursor-pointer w-[60px] h-[60px] rounded-full  flex justify-center items-center shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
          >
            <img src={Heart} alt="like icon" className="max-w-[30px]" />
          </button>
          {post.user.username === currentUser && (
            <button
              onClick={deletePost}
              className="bg-red-500 rounded-md py-3 text-white font-semibold w-full block cursor-pointer mt-[1rem]"
            >
              Delete Post
            </button>
          )}
        </div>
      )}
    </li>
  );
}
