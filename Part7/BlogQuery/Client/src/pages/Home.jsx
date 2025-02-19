import { useContext } from "react";
import { BlogContext } from "../BlogAppContext";
import LoginForm from "../Components/LoginForm";
import Welcome from "../Components/Welcome";
import LogOut from "../Components/LogOut";
import AddBlogPost from "../Components/AddBlogPost";
import Blogposts from "../Components/Blogposts";

export default function Home() {
  const { userInfo } = useContext(BlogContext).blogauth;
  return (
    <div className="pt-[5vh] max-w-screen-md mx-auto w-11/12">
      {!userInfo ? (
        <LoginForm />
      ) : (
        <section>
          <div className="flex items-center gap-[.5rem]">
            <Welcome />
            <LogOut />
          </div>
          <AddBlogPost />
          <Blogposts />
        </section>
      )}
    </div>
  );
}
