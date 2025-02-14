import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/Anecdotesreducer";
import { sendNotification } from "../reducers/NotificationReducer";

export default function NewAnecdote() {
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    const value = e.target.anecdote.value;
    if (value.length < 3) {
      dispatch(sendNotification(`Make your anecdote longer!!`, "alert", 2));
      return;
    }
    dispatch(newAnecdote(value));
    dispatch(sendNotification(`${value} Added!`, "success", 1.5));
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="anecdote" placeholder="Your Anecdote" />
      <button type="submit">Add</button>
    </form>
  );
}
