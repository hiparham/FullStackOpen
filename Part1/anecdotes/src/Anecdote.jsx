export default function Anecdote({ anecdotes, selected, votes }) {
  return (
    <h3>
      {anecdotes[selected]}{" "}
      {votes[selected] > 0 && `Votes : ${votes[selected]}`}{" "}
    </h3>
  );
}
