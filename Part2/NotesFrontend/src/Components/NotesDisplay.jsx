import Note from "./Note";

export default function NotesDisplay({ array }) {
  return (
    <div>
      <ul>
        {array.map((note) => {
          return <Note {...note} key={note.id} />;
        })}
      </ul>
    </div>
  );
}
