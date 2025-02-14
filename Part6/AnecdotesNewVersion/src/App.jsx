import { useEffect } from "react";
import { useDispatch } from "react-redux";
//
import { getAll } from "./reducers/Anecdotesreducer";
import AnecdotesDisplay from "./components/AnecdotesDisplay";
import FilterAnecdote from "./components/FilterAnecdote";
import NewAnecdote from "./components/NewAnecdote";
import Notification from "./components/Notification";

export default function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAll());
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
