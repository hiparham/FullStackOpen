import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import BlogStore from "./store/BlogStore.js";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")).render(
  <Provider store={BlogStore}>
    <App />
  </Provider>
);
