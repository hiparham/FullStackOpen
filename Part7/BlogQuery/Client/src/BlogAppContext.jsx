import { useReducer } from "react";
import { createContext } from "react";

const initial = {
  userInfo: JSON.parse(localStorage.getItem("BlogAuth")) || "",
};

function BlogReducer(state, action) {
  switch (action.type) {
    case "login": {
      localStorage.setItem("BlogAuth", JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    }
    case "logout": {
      localStorage.removeItem("BlogAuth");
      return { ...state, userInfo: "" };
    }
    default: {
      return initial;
    }
  }
}

const BlogContext = createContext();

export default function BlogAppContext({ children }) {
  const [state, dispatch] = useReducer(BlogReducer, initial);
  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
}

export { BlogContext };
