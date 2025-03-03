import { CoursePart } from "../Types";

export default function Total({ exercises }: { exercises: CoursePart[] }) {
  const exerciseCount: number = exercises
    .map((x) => x.exerciseCount)
    .reduce((acc, curr) => (acc += curr), 0);

  return (
    <footer>
      <h2>Total Exercises {exerciseCount}</h2>
    </footer>
  );
}
