import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAllItems = () => {
  return axios.get(baseUrl).then(({ data }) => data);
};

const postAnecdote = async (content) => {
  const newPost = await axios.post(baseUrl, { content, votes: 0 });
  return newPost.data;
};

const voteItem = async (item) => {
  const request = await axios.put(baseUrl + "/" + item.id, {
    ...item,
    votes: item.votes + 1,
  });
  return request.data;
};

export { getAllItems, voteItem, postAnecdote };
