export default function BestAnecdote({ votes, anecdotes }) {
  const maxNumber = Math.max(...Object.values(votes));

  if (maxNumber < 1) {
    return null;
  }

  const ents = Object.entries(votes).find((x) => x[1] === maxNumber);

  const myAnec = anecdotes[+ents[0]];

  return <div>Anecdote of the day : {myAnec}</div>;
}
