import axios from "axios";
const Base_url = "/api";
const GetAllBlogs = async () => {
  const posts = await axios.get(Base_url + "/" + "blogs");
  return posts.data;
};
export { GetAllBlogs };
