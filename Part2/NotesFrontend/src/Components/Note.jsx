export default function Note({ content, important }) {
  return (
    <li>
      <p>
        {content} {important && "✅"}
      </p>
    </li>
  );
}
