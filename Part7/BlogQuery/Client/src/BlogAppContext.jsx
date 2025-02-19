import { createContext } from "react";

const BlogContext = createContext();

export default function BlogAppContext({ children }) {
  return <BlogContext.Provider>{children}</BlogContext.Provider>;
}

export { BlogAppContext };
