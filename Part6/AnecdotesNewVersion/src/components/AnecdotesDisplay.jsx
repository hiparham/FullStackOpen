import { useDispatch, useSelector } from "react-redux";
import { setVote } from "../reducers/Helpers";
export default function AnecdotesDisplay() {
  const AllAnecdotes = useSelector((selector) => {
    if (!selector.Filter || selector.Filter.length < 2) {
      return selector.Anecdotes;
    }
    return selector.Anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(selector.Filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();
  const giveVote = (x) => {
    dispatch(setVote(x));
  };

  return (
    <div>
      <ul>
        {AllAnecdotes.map((anecdote) => {
          return (
            <li key={anecdote.id}>
              <p>{anecdote.content}</p>
              <button onClick={() => giveVote(anecdote.id)}>
                Votes {anecdote.votes}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
