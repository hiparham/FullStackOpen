export default function Note({ id,content, important,toggleImportant }) {
  return (
    <li>
      <p>
        {content} {important && "✅"} | <button onClick={()=>toggleImportant(id)}>{important?'Remove Importance':"Mark As Important"}</button>
      </p>
    </li>
  );
}
