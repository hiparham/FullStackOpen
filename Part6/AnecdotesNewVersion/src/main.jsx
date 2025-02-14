import "./index.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import AnecdotesReducer from "./reducers/Anecdotesreducer.js";
import FilterAnecdote from "./reducers/FilterAnecdote.js";

const combinedReducers = combineReducers({
  Anecdotes: AnecdotesReducer,
  Filter: FilterAnecdote,
});
const AnecdoteStore = createStore(combinedReducers);

createRoot(document.getElementById("root")).render(
  <Provider store={AnecdoteStore}>
    <App />
  </Provider>
);
