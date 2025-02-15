import { useReducer } from "react";
import { createContext } from "react";

const AnecdoteContext = createContext();

const AnecdoteReducer = (state, action) => {
  switch (action.type) {
    case "Notification": {
      return { ...state, notification: action.payload };
    }
    case "CleanUp": {
      return { ...state, notification: "" };
    }
    default: {
      return state;
    }
  }
};

const AnecdoteContextProvider = ({ children }) => {
  const [anecdoteState, AnecdoteDispatch] = useReducer(AnecdoteReducer, {
    notification: "",
  });
  return (
    <AnecdoteContext.Provider
      value={{ state: anecdoteState, dispatch: AnecdoteDispatch }}
    >
      {children}
    </AnecdoteContext.Provider>
  );
};
export { AnecdoteContextProvider };
export default AnecdoteContext;
