import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/Anecdotesreducer";
import {
  cleanUp,
  noteAdded,
  noteFailed,
} from "../reducers/NotificationReducer";

export default function NewAnecdote() {
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    const value = e.target.anecdote.value;
    if (value.length < 3) {
      dispatch(noteFailed("Anecdote must be 3+ characters long"));
      return;
    }
    dispatch(newAnecdote(value));
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="anecdote" placeholder="Your Anecdote" />
      <button type="submit">Add</button>
    </form>
  );
}
