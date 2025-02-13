import AnecdotesDisplay from "./components/AnecdotesDisplay";
import NewAnecdote from "./components/NewAnecdote";

export default function App() {
  return (
    <div>
      <h1>Anecdotes</h1>
      <NewAnecdote />
      <AnecdotesDisplay />
    </div>
  );
}
