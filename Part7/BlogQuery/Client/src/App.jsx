import { useState } from "react";
import {
  addBlogPost,
  deleteBlogPost,
  GetAllBlogs,
  likeBlogPost,
} from "./Helpers/BlogsHelper";
import Blogposts from "./Components/Blogposts";
import LoginForm from "./Components/LoginForm";
import LogOut from "./Components/LogOut";
import AddBlogPost from "./Components/AddBlogPost";
import Welcome from "./Components/Welcome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export default function App() {
  const queryclient = useQueryClient();
  const [userInfo, setuserInfo] = useState(
    JSON.parse(localStorage.getItem("BlogAuth")) || ""
  );
  const { data } = useQuery({
    queryKey: ["Blog"],
    refetchOnWindowFocus: false,
    retry: 2,
    queryFn: GetAllBlogs,
  });
  const sorteditems = data && data.slice().sort((a, b) => b.likes - a.likes);
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
  const postAdd = useMutation({
    mutationFn: addBlogPost,
    onSuccess: () => {
      queryclient.invalidateQueries(["Blog"]);
    },
  });
  const postLike = useMutation({
    mutationFn: likeBlogPost,
    onSuccess: () => {
      queryclient.invalidateQueries(["Blog"]);
    },
  });
  const postDelete = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      queryclient.invalidateQueries(["Blog"]);
    },
  });
  //
  function addaPost(x) {
    postAdd.mutate(x);
  }
  //
  function updateLikes(x) {
    const newItem = { ...x, likes: x.likes + 1 };
    postLike.mutate(newItem);
  }
  //
  function deletePost(x) {
    postDelete.mutate(x);
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
            posts={sorteditems}
            updateLikes={updateLikes}
            postDel={deletePost}
          />
        </section>
      )}
    </div>
  );
}
