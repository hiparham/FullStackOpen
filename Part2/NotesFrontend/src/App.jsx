import { useEffect, useState } from "react";
import { EditOldItem, GetAllItems, postNewItem } from "./Services/Helpers";
import NotesDisplay from "./Components/NotesDisplay";
import Form from "./Components/Form";
import ShowButtons from "./Components/ShowButtons";
import SuccessMsg from "./Components/SuccessMsg";
import ErrorMessage from "./Components/ErrorMessage";
//
export default function App() {
  const [error, setError] = useState(false);
  const [notif, setNotif] = useState("");
  const [AllNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(true);
  //
  useEffect(() => {
    GetAllItems()
      .then((response) => {
        setLoading(false);
        setError(false);
        setAllNotes(response);
      })
      .catch(() => {
        setError("Something Went Wrong, Refresh the page.");
      });
  }, []);
  // Adding new note
  function AddNewNote(noteobject) {
    const cr = {
      content: noteobject.content,
      important: noteobject.important,
    };
    postNewItem(cr)
      .then((response) => {
        setAllNotes(response.notes);
        setNotif("Note Added");
        setTimeout(() => {
          setNotif("");
        }, 1500);
      })
      .catch(() => {
        setError("Post was not added, try again.");
        setTimeout(() => {
          setError("");
        }, 1500);
      });
  }
  // Editing Importance
  const changeImportance = (x) => {
    const itemFind = AllNotes.find((item) => item.id === x);
    const newItem = { ...itemFind, important: !itemFind.important };
    EditOldItem(x, newItem)
      .then((res) => {
        setAllNotes(AllNotes.map((n) => (n.id === itemFind.id ? res : n)));
        setNotif("Note Edited");
        setTimeout(() => {
          setNotif("");
        }, 1500);
      })
      .catch(() => {
        setError("Note Does not exist.");
        setTimeout(() => {
          setError(false);
        }, 1500);
        setAllNotes(AllNotes.filter((x) => x.id !== itemFind.id));
      });
  };
  //
  const toggleImportance = (x) => setShowAll(x === "i" ? false : true);
  const NotesToShow = showAll ? AllNotes : AllNotes.filter((x) => x.important);
  //
  return (
    <section className="container">
      <SuccessMsg txt={notif} />
      <ErrorMessage txt={error} />
      <ShowButtons handleShow={toggleImportance} />
      <Form AddNote={AddNewNote} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <NotesDisplay array={NotesToShow} toggleImportant={changeImportance} />
      )}
    </section>
  );
}
