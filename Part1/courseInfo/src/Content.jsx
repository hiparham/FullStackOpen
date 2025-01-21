import Part from "./Part";

export default function Content({ parts }) {
  return (
    <ul>
      <Part part={parts[0].part} exercises={parts[0].exercises} />
      <Part part={parts[1].part} exercises={parts[1].exercises} />
      <Part part={parts[2].part} exercises={parts[2].exercises} />
    </ul>
  );
}
