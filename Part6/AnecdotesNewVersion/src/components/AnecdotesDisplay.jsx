import { useDispatch, useSelector } from "react-redux";
import { submitVote } from "../reducers/Anecdotesreducer";

export default function AnecdotesDisplay() {
  const AllAnecdotes = useSelector((state) => {
    if (state.Filter.length < 2) {
      return state.Anecdotes;
    } else {
      return state.Anecdotes.filter((x) =>
        x.content.toLowerCase().includes(state.Filter.toLowerCase())
      );
    }
  })
    .slice()
    .sort((a, b) => b.votes - a.votes);

  const dispatch = useDispatch();
  
  const uptove = (x) => {
    const item = AllAnecdotes.find((anecdote) => anecdote.id === x);
    dispatch(submitVote(x, { ...item, votes: item.votes + 1 }));
  };

  return (
    <div>
      <ul>
        {AllAnecdotes.map((anecdote) => {
          return (
            <li key={anecdote.id}>
              <p>{anecdote.content}</p>
              <button onClick={() => uptove(anecdote.id)}>
                Votes {anecdote.votes}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
