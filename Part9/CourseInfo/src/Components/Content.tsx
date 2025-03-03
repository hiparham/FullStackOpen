import { CoursePart } from "../Types";
import Part from "./Part";

export default function Content({ courses }: { courses: CoursePart[] }) {
  return (
    <ul>
      {courses.map((course) => {
        return <Part part={course} key={course.name} />;
      })}
    </ul>
  );
}
