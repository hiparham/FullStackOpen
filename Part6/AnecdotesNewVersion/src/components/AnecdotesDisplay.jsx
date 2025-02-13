import { useDispatch, useSelector } from "react-redux";
import { setVote } from "../reducers/Helpers";
export default function AnecdotesDisplay() {
  const AllAnecdotes = useSelector((selector) => {
    return selector.slice().sort((a, b) => b.votes - a.votes);
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
            <li>
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
