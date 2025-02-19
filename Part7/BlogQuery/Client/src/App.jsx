import Blogposts from "./Components/Blogposts";
import LoginForm from "./Components/LoginForm";
import LogOut from "./Components/LogOut";
import AddBlogPost from "./Components/AddBlogPost";
import Welcome from "./Components/Welcome";
import { useContext } from "react";
import { BlogContext } from "./BlogAppContext";
export default function App() {
  const { userInfo } = useContext(BlogContext).state;
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
