import axios from "axios";
const base = "http://localhost:3001/anecdotes";

const getAllAnecdotes = async () => {
  const init = await axios.get(base);
  return init.data;
};

const postAnecdote = async (content) => {
  const init = await axios.post(base, { content, important: false });
  return init.data;
};

export { getAllAnecdotes, postAnecdote };
