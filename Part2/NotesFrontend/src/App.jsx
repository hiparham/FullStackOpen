import { useEffect, useState } from "react";
import NotesDisplay from "./Components/NotesDisplay";
import Form from "./Components/Form";
import ShowButtons from "./Components/ShowButtons";
import { EditOldItem, GetAllItems, postNewItem } from "./Services/Helpers";
export default function App() {
  const [AllNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(true);
  //
  useEffect(() => {
    GetAllItems().then((response) => {
      setLoading(false);
      setAllNotes(response);
    });
  }, []);
  // Adding new note
  function AddNewNote(noteobject) {
    const cr = {
      content: noteobject.content,
      important: noteobject.important,
    };
    postNewItem(cr).then((response) => {
      setAllNotes([...AllNotes, { ...response }]);
    });
  }
  // Editing Importance
  const changeImportance = (x) => {
    const itemFind = AllNotes.find((item) => item.id === x);
    const newItem = { ...itemFind, important: !itemFind.important };
    EditOldItem(x, newItem)
      .then((res) => {
        setAllNotes(AllNotes.map((n) => (n.id === itemFind.id ? res : n)));
      })
      .catch(() => {
        alert(`The note ${itemFind.content} has been deleted already.`);
        setAllNotes(AllNotes.filter((x) => x.id !== itemFind.id));
      });
  };
  //
  const toggleImportance = (x) => setShowAll(x === "i" ? false : true);
  const NotesToShow = showAll ? AllNotes : AllNotes.filter((x) => x.important);
  //
  return (
    <div>
      <ShowButtons handleShow={toggleImportance} />
      <Form AddNote={AddNewNote} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <NotesDisplay array={NotesToShow} toggleImportant={changeImportance} />
      )}
    </div>
  );
}
