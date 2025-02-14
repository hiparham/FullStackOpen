import { v4 as uuidv4 } from "uuid";

const generateId = () => uuidv4();

const setVote = (x) => {
  return { type: "Vote", id: x };
};

const AddAnecdote = (content) => {
  return {
    type: "Add_Anecdote",
    payload: {
      content,
    },
  };
};

const FilterValue = (word) => {
  return {
    type: "Set_filter",
    payload: word,
  };
};

export { generateId, setVote, AddAnecdote, FilterValue };
