import axios from "axios";
const base = "http://localhost:3001/anecdotes";

const getAllAnecdotes = async () => {
  const init = await axios.get(base);
  return init.data;
};

const postAnecdote = async (content) => {
  const init = await axios.post(base, { content, important: false, votes: 0 });
  return init.data;
};

const upVote = async (id, item) => {
  const init = await axios.put(base + "/" + id, item);
  return init.data;
};

export { getAllAnecdotes, postAnecdote, upVote };
