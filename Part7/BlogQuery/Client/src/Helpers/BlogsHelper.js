import axios from "axios";
import extractToken from "./ExtractToken";
const Base_url = "/api";
const GetAllBlogs = async () => {
  const posts = await axios.get(Base_url + "/" + "blogs");
  return posts.data;
};
//
const addBlogPost = async (post) => {
  const init = await axios.post(Base_url + "/blogs", post, {
    headers: {
      Authorization: extractToken(),
    },
  });
  return init.data;
};
//
const likeBlogPost = async (item) => {
  const init = await axios.put(Base_url + "/blogs" + "/" + item.id, item, {
    headers: {
      Authorization: extractToken(),
    },
  });
  return init.data;
};
//
const deleteBlogPost = async (id) => {
  const init = await axios.delete(Base_url + "/blogs" + "/" + id, {
    headers: {
      Authorization: extractToken(),
    },
  });
  return init;
};
export { GetAllBlogs, addBlogPost, likeBlogPost, deleteBlogPost };
