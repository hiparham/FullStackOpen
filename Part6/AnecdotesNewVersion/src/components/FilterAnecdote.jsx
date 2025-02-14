import { useDispatch } from "react-redux";
import { FilterValue } from "../reducers/Helpers";

export default function FilterAnecdote() {
  const dispatch = useDispatch();
  function handleChange(e) {
    const value = e.target.value;
    dispatch(FilterValue(value));
  }
  return (
    <form onChange={handleChange}>
      <input type="text" placeholder="Search In Anecdotes" />
    </form>
  );
}
