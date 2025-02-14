import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/Anecdotesreducer";
import { cleanUp, notifVote } from "../reducers/NotificationReducer";
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

  return (
    <div>
      <ul>
        {AllAnecdotes.map((anecdote) => {
          return (
            <li key={anecdote.id}>
              <p>{anecdote.content}</p>
              <button
                onClick={() => {
                  dispatch(addVote(anecdote.id));
                  dispatch(notifVote(anecdote.content));
                  setTimeout(() => {
                    dispatch(cleanUp());
                  }, 5000);
                }}
              >
                Votes {anecdote.votes}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
