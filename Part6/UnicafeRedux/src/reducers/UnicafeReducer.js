import { createStore } from "redux";

const initialReviews = {
  good: 0,
  bad: 0,
  neutral: 0,
};

const UniReducer = (state = initialReviews, action) => {
  switch (action.type) {
    case "GOOD": {
      return { ...state, good: state.good + 1 };
    }
    case "BAD": {
      return { ...state, bad: state.bad + 1 };
    }
    case "NEUTRAL": {
      return { ...state, neutral: state.neutral + 1 };
    }
    case "RESET": {
      return initialReviews;
    }
    default: {
      return state;
    }
  }
};

const UniStore = createStore(UniReducer);

export { UniStore, UniReducer };
