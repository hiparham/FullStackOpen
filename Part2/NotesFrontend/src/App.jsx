import { useEffect, useState } from "react";
import NotesDisplay from "./Components/NotesDisplay";
import Form from "./Components/Form";
import ShowButtons from "./Components/ShowButtons";

export default function App() {
  const [AllNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(true);
  //
  useEffect(() => {
    fetch("/api")
      .then((x) => x.json())
      .then((items) => {
        setLoading(false);
        setAllNotes(items);
      });
  }, []);
  //
  function AddNewNote(noteobject) {
    const cr = {
      id: String(AllNotes.length + 1),
      content: noteobject.content,
      important: noteobject.important,
    };
    //
    fetch("/api", {
      method: "POST",
      body: JSON.stringify(cr),
    }).then((response) => {
      if (response.ok) {
        setAllNotes([...AllNotes, cr]);
      }
    });
  }
  //
  const toggleImportance = (x) => setShowAll(x === "i" ? false : true);
  //
  const NotesToShow = showAll ? AllNotes : AllNotes.filter((x) => x.important);
  //
  return (
    <div>
      <ShowButtons handleShow={toggleImportance} />
      <Form AddNote={AddNewNote} />
      {loading ? <p>Loading...</p> : <NotesDisplay array={NotesToShow} />}
    </div>
  );
}
