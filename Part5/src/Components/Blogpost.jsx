import { useState } from "react";
import Heart from "../assets/heart.svg";
import { deleteBlogPost, likeBlogPost } from "../Helpers/BlogsHelper";
export default function Blogpost({ post, updateLikes, postDel }) {
  const [show, setShow] = useState(false);
  const currentToken = JSON.parse(localStorage.getItem("BlogAuth")).token || "";
  async function likePost() {
    const id = post.id;
    const likes = post.likes + 1;
    try {
      const init = await likeBlogPost(id, { likes: likes }, currentToken);
      updateLikes(init);
    } catch (error) {
      console.log("ERROR");
    }
  }
  async function deletePost() {
    const id = post.id;
    try {
      const init = await deleteBlogPost(id, currentToken);
      postDel(id);
    } catch (error) {
      console.log("ERROR");
    }
  }
  return (
    <li key={post.title}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold capitalize">{post.title}</h3>
        <button
          onClick={() => setShow(!show)}
          className="cursor-pointer shadow-md py-2 px-5 rounded-md bg-white"
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
            className="mt-[1rem] cursor-pointer w-[60px] h-[60px] rounded-full  flex justify-center items-center shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
          >
            <img src={Heart} alt="like icon" className="max-w-[30px]" />
          </button>
          <button
            onClick={deletePost}
            className="bg-red-500 rounded-md py-3 text-white font-semibold w-full block cursor-pointer mt-[1rem]"
          >
            Delete Post
          </button>
        </div>
      )}
    </li>
  );
}
