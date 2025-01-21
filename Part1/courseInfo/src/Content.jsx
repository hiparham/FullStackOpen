export default function Content({ parts }) {
  return (
    <div>
      <ul>
        <li>
          <p>
            {parts[0].part} - {parts[0].exercises}
          </p>
        </li>
        <li>
          <p>
            {parts[1].part} - {parts[1].exercises}
          </p>
        </li>
        <li>
          <p>
            {parts[2].part} - {parts[2].exercises}
          </p>
        </li>
      </ul>
    </div>
  );
}
