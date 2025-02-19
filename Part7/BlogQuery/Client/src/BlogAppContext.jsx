import { useReducer } from "react";
import { createContext } from "react";

const authinitial = {
  userInfo: JSON.parse(localStorage.getItem("BlogAuth")) || "",
};

function BlogauthReducer(state, action) {
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
      return authinitial;
    }
  }
}

const BlogContext = createContext();

export default function BlogAppContext({ children }) {
  const [blogauth, dispatchblogauth] = useReducer(BlogauthReducer, authinitial);
  return (
    <BlogContext.Provider value={{ blogauth, dispatchblogauth }}>
      {children}
    </BlogContext.Provider>
  );
}

export { BlogContext };
