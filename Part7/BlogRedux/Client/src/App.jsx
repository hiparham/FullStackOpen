import { useEffect, useState } from "react";
import LoginForm from "./Components/LoginForm";
import Signup from "./Components/Signup";
import BlogAppcontainer from "./Components/BlogAppcontainer";
import AppWrapper from "./Components/AppWrapper";
import { useDispatch } from "react-redux";
import { showApp } from "./store/BlogStore";
export default function App() {
  const [userInfo, setuserInfo] = useState(
    JSON.parse(localStorage.getItem("BlogAuth")) || ""
  );
  const dispatch = useDispatch();
  const [AllBlogs, setAllBlogs] = useState([]);
  // User Information
  function getUserInfo(x) {
    localStorage.setItem("BlogAuth", JSON.stringify(x));
    setuserInfo(x);
  }
  // Logging out
  function logout() {
    localStorage.removeItem("BlogAuth");
    setuserInfo("");
  }
  // Adding Blogpost
  function addaPost(x) {
    setAllBlogs([...AllBlogs, x]);
  }
  // Liking Blogpost
  function updateLikes(x) {
    const updateditem = x;
    setAllBlogs((old) =>
      old.map((p) => (p.id !== updateditem.id ? p : updateditem))
    );
  }
  // Deleting A Blogpost
  function deletePost(x) {
    setAllBlogs((old) => old.filter((p) => p.id !== x));
  }
  return (
    <AppWrapper>
      <LoginForm userInfo={userInfo} setuserinfo={getUserInfo} />
      <Signup />
      <BlogAppcontainer
        userInfo={userInfo}
        addaPost={addaPost}
        logout={logout}
        updateLikes={updateLikes}
        deletePost={deletePost}
      />
    </AppWrapper>
  );
}
