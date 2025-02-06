import { useEffect, useState } from "react";
import { GetAllBlogs } from "./Helpers/BlogsHelper";
import Blogposts from "./Components/Blogposts";
import LoginForm from "./Components/LoginForm";
import LogOut from "./Components/LogOut";
import AddBlogPost from "./Components/AddBlogPost";

export default function App() {
  const [userInfo, setuserInfo] = useState(
    JSON.parse(localStorage.getItem("BlogAuth")) || ""
  );
  const [AllBlogs, setAllBlogs] = useState([]);
  //
  useEffect(() => {
    GetAllBlogs().then((data) => {
      setAllBlogs(data);
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
    console.log(x);
  }
  //
  return (
    <div className="pt-[5vh] max-w-screen-md mx-auto w-11/12">
      {!userInfo ? (
        <LoginForm userInfo={userInfo} setuserinfo={getUserInfo} />
      ) : (
        <section>
          <div className="flex items-center gap-[.5rem]">
            <h1 className="text-2xl text-blue-700">
              Hello {userInfo.name.toUpperCase()}
            </h1>
            <LogOut logout={logout} />
          </div>
          <AddBlogPost postAdded={addaPost} />
          <Blogposts posts={AllBlogs} />
        </section>
      )}
    </div>
  );
}
