import { configureStore } from "@reduxjs/toolkit";
import AnecdoteReducer from "./Anecdotesreducer";
import FilterAnecdote from "./FilterAnecdote";
import NotificationReducer from "./NotificationReducer";
const store = configureStore({
  reducer: {
    Anecdotes: AnecdoteReducer,
    Filter: FilterAnecdote,
    Notification: NotificationReducer,
  },
});

export default store;
