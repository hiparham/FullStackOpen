import Blogpost from "./Blogpost";

export default function Blogposts({ posts, updateLikes, postDel }) {
  if (!posts) return null;
  return (
    <div>
      <ul className="mt-[2rem] flex flex-col gap-[2.5rem]">
        {posts.map((post) => {
          return (
            <Blogpost
              key={post.title}
              post={post}
              updateLikes={updateLikes}
              postDel={postDel}
            />
          );
        })}
      </ul>
    </div>
  );
}
