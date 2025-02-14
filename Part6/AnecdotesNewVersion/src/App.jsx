import AnecdotesDisplay from "./components/AnecdotesDisplay";
import FilterAnecdote from "./components/FilterAnecdote";
import NewAnecdote from "./components/NewAnecdote";
import Notification from "./components/Notification";

export default function App() {
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <FilterAnecdote />
      <NewAnecdote />
      <AnecdotesDisplay />
    </div>
  );
}
