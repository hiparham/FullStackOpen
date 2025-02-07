import { useEffect, useState } from "react";
import { GetAllBlogs } from "./Helpers/BlogsHelper";
import Blogposts from "./Components/Blogposts";
import LoginForm from "./Components/LoginForm";
import LogOut from "./Components/LogOut";
import AddBlogPost from "./Components/AddBlogPost";
import Welcome from "./Components/Welcome";
export default function App() {
  const [userInfo, setuserInfo] = useState(
    JSON.parse(localStorage.getItem("BlogAuth")) || ""
  );
  const [AllBlogs, setAllBlogs] = useState([]);
  //
  useEffect(() => {
    GetAllBlogs().then((data) => {
      const sortedData = data.sort((a, b) => b.likes - a.likes);
      setAllBlogs(sortedData);
    });
  }, []);
  //
  function getUserInfo(x) {
    localStorage.setItem("BlogAuth", JSON.stringify(x));
    setuserInfo(x);
  }
  //
  function logout() {
    localStorage.removeItem("BlogAuth");
    setuserInfo("");
  }
  //
  function addaPost(x) {
    setAllBlogs([...AllBlogs, x]);
  }
  //
  function updateLikes(x) {
    const updateditem = x;
    setAllBlogs((old) =>
      old.map((p) => (p.id !== updateditem.id ? p : updateditem))
    );
  }
  //
  function deletePost(x) {
    setAllBlogs((old) => old.filter((p) => p.id !== x));
  }
  return (
    <div className="pt-[5vh] max-w-screen-md mx-auto w-11/12">
      {!userInfo ? (
        <LoginForm userInfo={userInfo} setuserinfo={getUserInfo} />
      ) : (
        <section>
          <div className="flex items-center gap-[.5rem]">
            <Welcome userInfo={userInfo.name} />
            <LogOut logout={logout} />
          </div>
          <AddBlogPost postAdded={addaPost} info={userInfo} />
          <Blogposts
            posts={AllBlogs}
            updateLikes={updateLikes}
            postDel={deletePost}
          />
        </section>
      )}
    </div>
  );
}
