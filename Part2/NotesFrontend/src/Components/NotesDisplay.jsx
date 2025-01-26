import Note from "./Note";

export default function NotesDisplay({ array, toggleImportant }) {
  return (
    <div>
      <ul>
        {array.map((note) => {
          return (
            <Note {...note} key={note.id} toggleImportant={toggleImportant} />
          );
        })}
      </ul>
    </div>
  );
}
