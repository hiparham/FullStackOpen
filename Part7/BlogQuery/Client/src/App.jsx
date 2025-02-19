import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import { useContext } from "react";
import { BlogContext } from "./BlogAppContext";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import User from "./pages/User";
import Post from "./pages/Post";

export default function App() {
  const { userInfo } = useContext(BlogContext).blogauth;
  return (
    <main>
      {userInfo && <Navbar />}
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Users />} path="/users" />
        <Route element={<User />} path="/users/:id" />
        <Route element={<Posts />} path="/posts" />
        <Route element={<Post />} path="/posts/:id" />
      </Routes>
    </main>
  );
}
