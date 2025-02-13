import { createRoot } from "react-dom/client";
import { UniStore } from "./reducers/UnicafeReducer";

export default function CounterApp() {
  const { good, bad, neutral } = UniStore.getState();
  function giveVote(x) {
    UniStore.dispatch({ type: x });
  }
  return (
    <div>
      <h1>Unicafe Reviews</h1>
      <p>Good : {good}</p>
      <p>Bad : {bad}</p>
      <p>Neutral : {neutral}</p>
      <button onClick={() => giveVote("GOOD")}>Good</button>
      <button onClick={() => giveVote("BAD")}>Bad</button>
      <button onClick={() => giveVote("NEUTRAL")}>Neutral</button>
      <button onClick={() => giveVote("RESET")}>Restart The App</button>
    </div>
  );
}

function RenderApp() {
  createRoot(document.getElementById("root")).render(<CounterApp />);
}
RenderApp();
UniStore.subscribe(RenderApp);
