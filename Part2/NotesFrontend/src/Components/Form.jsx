import { useState } from "react";

export default function Form({ AddNote }) {
  const [note, setNote] = useState("");
  const [imp, setImp] = useState(false);
  //
  function handleSubmit(e) {
    e.preventDefault();
    // Sending Request to server
    AddNote({ content: note, important: imp });
    // Refreshing the form
    setNote("");
    setImp(false);
  }
  //
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <label htmlFor="important">Important</label>
      <input
        type="checkbox"
        name="important"
        id="important"
        checked={imp}
        onChange={() => setImp(!imp)}
      />
      <button type="submit">Add Note</button>
    </form>
  );
}
