import { createSlice } from "@reduxjs/toolkit";

const FilterAnecdote = createSlice({
  name: "Filter",
  initialState: "",
  reducers: {
    filteranecdotes(state, action) {
      return action.payload;
    },
  },
});
export default FilterAnecdote.reducer;

export const { filteranecdotes } = FilterAnecdote.actions;
