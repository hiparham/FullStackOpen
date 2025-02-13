import { useDispatch } from "react-redux";
import { AddAnecdote } from "../reducers/Helpers";

export default function NewAnecdote() {
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(AddAnecdote(e.target.anecdote.value));
    e.target.reset();
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="anecdote" placeholder="Your Anecdote" />
      <button type="submit">Add</button>
    </form>
  );
}
