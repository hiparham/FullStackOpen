import { useDispatch, useSelector } from "react-redux";
import Welcome from "./Welcome";
import LogOut from "./LogOut";
import AddBlogPost from "./AddBlogPost";
import { useEffect } from "react";
import { fetchallposts } from "../store/BlogStore";
import Blogposts from "./Blogposts";

export default function BlogAppcontainer({
  userInfo,
  addaPost,
  logout,
  updateLikes,
  deletePost,
}) {
  const data = useSelector((state) => state.blogposts);
  const status = useSelector((state) => state.status);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchallposts());
  }, []);

  if (status !== "app") return null;

  return (
    <section>
      <div className="flex items-center gap-[.5rem]">
        <Welcome userInfo={userInfo.name} />
        <LogOut logout={logout} />
      </div>
      <AddBlogPost postAdded={addaPost} info={userInfo} />
      <Blogposts
        posts={data}
        updateLikes={updateLikes}
        postDel={deletePost}
      />
    </section>
  );
}
