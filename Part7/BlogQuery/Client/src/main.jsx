import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";
import BlogAppContext from "./BlogAppContext.jsx";
const client = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <BlogAppContext>
      <App />
    </BlogAppContext>
  </QueryClientProvider>
);
