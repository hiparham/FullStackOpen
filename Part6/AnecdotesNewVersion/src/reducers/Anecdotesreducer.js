import { createSlice } from "@reduxjs/toolkit";
import { getAllAnecdotes, postAnecdote, upVote } from "./Helpers";

const AnecdoteSlice = createSlice({
  name: "Anecdotes",
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      return [...state, action.payload];
    },
    addVote(state, action) {
      return state.map((x) =>
        x.id !== action.payload.id ? x : action.payload
      );
    },
    setUpAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const getAll = () => {
  return async (dispatch) => {
    const data = await getAllAnecdotes();
    dispatch(setUpAnecdotes(data));
  };
};
export const newAnecdote = (content) => {
  return async (dispatch) => {
    const newNote = await postAnecdote(content);
    dispatch(addAnecdote(newNote));
  };
};
export const submitVote = (id, item) => {
  return async (dispatch) => {
    const vote = await upVote(id, item);
    dispatch(addVote(vote));
  };
};
export default AnecdoteSlice.reducer;

export const { addAnecdote, addVote, setUpAnecdotes } = AnecdoteSlice.actions;
