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
//
const likeBlogPost = async (id, update, token) => {
  const init = await axios.put(Base_url + "/blogs" + "/" + id, update, {
    headers: {
      Authorization: extractToken(token),
    },
  });
  return init.data;
};
//
const deleteBlogPost = async (id, token) => {
  const init = await axios.delete(Base_url + "/blogs" + "/" + id, {
    headers: {
      Authorization: extractToken(token),
    },
  });
  return init;
};
export { GetAllBlogs, addBlogPost, likeBlogPost,deleteBlogPost };
