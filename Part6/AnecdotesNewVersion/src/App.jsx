import { useEffect } from "react";
import AnecdotesDisplay from "./components/AnecdotesDisplay";
import FilterAnecdote from "./components/FilterAnecdote";
import NewAnecdote from "./components/NewAnecdote";
import Notification from "./components/Notification";
import { getAllAnecdotes } from "./reducers/Helpers";
import { useDispatch } from "react-redux";
import { setUpAnecdotes } from "./reducers/Anecdotesreducer";

export default function App() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    getAllAnecdotes().then((anecdotes) => {
      dispatch(setUpAnecdotes(anecdotes));
    });
  }, []);

  return (
    <div>
      <h1>Anecdotes App</h1>
      <Notification />
      <FilterAnecdote />
      <NewAnecdote />
      <AnecdotesDisplay />
    </div>
  );
}
