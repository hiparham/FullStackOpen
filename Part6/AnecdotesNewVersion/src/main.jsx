import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import AnecdoteStore from "./reducers/Anecdotesreducer.js";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={AnecdoteStore}>
    <App />
  </Provider>
);
