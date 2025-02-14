import { useDispatch } from "react-redux";
import { filteranecdotes } from "../reducers/FilterAnecdote";

export default function FilterAnecdote() {
  const dispatch = useDispatch();
  function handleChange(e) {
    const value = e.target.value;
    dispatch(filteranecdotes(value));
  }
  return (
    <form onChange={handleChange}>
      <input type="text" placeholder="Search In Anecdotes" />
    </form>
  );
}
