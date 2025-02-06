import axios from "axios";
import extractToken from "./ExtractToken";
const Base_url = "/api";
const GetAllBlogs = async () => {
  const posts = await axios.get(Base_url + "/" + "blogs");
  return posts.data;
};
//
const addBlogPost = async (post, token) => {
  const init = await axios.post(Base_url + "/blogs", post, {
    headers: {
      Authorization: extractToken(token),
    },
  });
  return init.data;
};
export { GetAllBlogs, addBlogPost };
