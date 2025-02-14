const FilterAnecdote = (state = "", action) => {
  switch (action.type) {
    case "Set_filter": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
export default FilterAnecdote;
