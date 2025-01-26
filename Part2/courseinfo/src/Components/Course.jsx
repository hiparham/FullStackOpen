import AllScores from "./AllScores";
import CourseParts from "./CourseParts";
import Header from "./Header";

export default function Course({ course }) {
  return (
    <li>
      <Header title={course.name} />
      <CourseParts course={course} />
      <AllScores exercises={course.parts} />
    </li>
  );
}
