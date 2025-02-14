import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/Anecdotesreducer";
import {
  cleanUp,
  noteAdded,
  noteFailed,
} from "../reducers/NotificationReducer";
import { postAnecdote } from "../reducers/Helpers";

export default function NewAnecdote() {
  const dispatch = useDispatch();
  async function handleSubmit(e) {
    e.preventDefault();
    const value = e.target.anecdote.value;
    if (value.length < 3) {
      dispatch(noteFailed("Anecdote must be 3+ characters long"));
      return;
    }
    const init = await postAnecdote(value);
    dispatch(addAnecdote(init));
    dispatch(noteAdded(`${init.content} just added!`));
    setTimeout(() => {
      dispatch(cleanUp());
    }, 2000);
    e.target.reset();
    e.target.blur();
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="anecdote" placeholder="Your Anecdote" />
      <button type="submit">Add</button>
    </form>
  );
}
