import { useEffect, useState } from "react";
import { GetAllBlogs } from "./Helpers/BlogsHelper";
import LoginForm from "./Components/LoginForm";
import { useSelector } from "react-redux";
import Signup from "./Components/Signup";
import BlogAppcontainer from "./Components/BlogAppcontainer";
export default function App() {
  const status = useSelector((state) => state.status);
  const [userInfo, setuserInfo] = useState(
    JSON.parse(localStorage.getItem("BlogAuth")) || ""
  );
  const [AllBlogs, setAllBlogs] = useState([]);
  useEffect(() => {
    GetAllBlogs()
      .then((data) => {
        const sortedData = data.sort((a, b) => b.likes - a.likes);
        setAllBlogs(sortedData);
      })
      .catch(() => {
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
      {status === "login" && (
        <LoginForm userInfo={userInfo} setuserinfo={getUserInfo} />
      )}
      {status === "signup" && <Signup />}
      <BlogAppcontainer
        userInfo={userInfo}
        addaPost={addaPost}
        logout={logout}
        updateLikes={updateLikes}
        deletePost={deletePost}
        AllBlogs={AllBlogs}
      />
    </div>
  );
}
