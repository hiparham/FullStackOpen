import { createSlice } from "@reduxjs/toolkit";

const AnecdoteSlice = createSlice({
  name: "Anecdotes",
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      return [...state, action.payload];
    },
    addVote(state, action) {
      return state.map((x) =>
        x.id !== action.payload ? x : { ...x, votes: x.votes + 1 }
      );
    },
    setUpAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export default AnecdoteSlice.reducer;

export const { addAnecdote, addVote, setUpAnecdotes } = AnecdoteSlice.actions;
