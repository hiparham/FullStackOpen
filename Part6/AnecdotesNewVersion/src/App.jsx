import AnecdotesDisplay from "./components/AnecdotesDisplay";
import FilterAnecdote from "./components/FilterAnecdote";
import NewAnecdote from "./components/NewAnecdote";

export default function App() {
  return (
    <div>
      <h1>Anecdotes</h1>
      <FilterAnecdote />
      <NewAnecdote />
      <AnecdotesDisplay />
    </div>
  );
}
