import { useSelector } from "react-redux";
import Welcome from "./Welcome";
import LogOut from "./LogOut";
import AddBlogPost from "./AddBlogPost";
import Blogpost from "./Blogpost";

export default function BlogAppcontainer({
  userInfo,
  addaPost,
  logout,
  updateLikes,
  deletePost,
  AllBlogs,
}) {
  const status = useSelector((state) => state.status);
  if (status !== "app") return null;
  return (
    <section>
      <div className="flex items-center gap-[.5rem]">
        <Welcome userInfo={userInfo.name} />
        <LogOut logout={logout} />
      </div>
      <AddBlogPost postAdded={addaPost} info={userInfo} />
      <Blogpost
        posts={AllBlogs}
        updateLikes={updateLikes}
        postDel={deletePost}
      />
    </section>
  );
}
