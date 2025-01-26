import allCourses from "../CourseInfo";
import Course from "./Course";

export default function CoursesWrapper() {
  return (
    <ul>
      {allCourses.map((course) => {
        return <Course course={course} key={course.id} />;
      })}
    </ul>
  );
}
