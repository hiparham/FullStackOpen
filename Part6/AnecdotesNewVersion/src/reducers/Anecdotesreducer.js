import { createSlice } from "@reduxjs/toolkit";
import { generateId } from "./Helpers";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const generateAnecdote = (content) => {
  return {
    id: generateId(),
    content,
    votes: 0,
  };
};
const initialAnecdotes = anecdotesAtStart.map(generateAnecdote);

const AnecdoteSlice = createSlice({
  name: "Anecdotes",
  initialState: initialAnecdotes,
  reducers: {
    addAnecdote(state, action) {
      return [...state, generateAnecdote(action.payload)];
    },
    addVote(state, action) {
      return state.map((x) =>
        x.id !== action.payload ? x : { ...x, votes: x.votes + 1 }
      );
    },
  },
});

export default AnecdoteSlice.reducer;

export const { addAnecdote, addVote } = AnecdoteSlice.actions;
