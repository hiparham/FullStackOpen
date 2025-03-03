import { CoursePart } from "../Types";

export default function Content({ courses }: { courses: CoursePart[] }) {
  return (
    <ul>
      {courses.map((course) => {
        return (
          <li key={course.name}>
            <p>
              {course.name} | {course.exerciseCount}
            </p>
            {course.kind === "basic" && (
              <>
                <p>BASIC | Description : {course.description}</p>
              </>
            )}
            {course.kind === "group" && (
              <>
                <p>Group Project : {course.groupProjectCount}</p>
              </>
            )}
            {course.kind === "background" && (
              <>
                <p>Description {course.description}</p>
                <p>Background {course.backgroundMaterial}</p>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}
