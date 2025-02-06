import { useEffect, useState } from "react";
import { GetAllBlogs } from "./Helpers/BlogsHelper";
import Blogposts from "./Components/Blogposts";

export default function App() {
  const [AllBlogs, setAllBlogs] = useState([]);
  useEffect(() => {
    GetAllBlogs().then((data) => {
      setAllBlogs(data);
    });
  }, []);
  return (
    <div>
      <Blogposts posts={AllBlogs} />
    </div>
  );
}
