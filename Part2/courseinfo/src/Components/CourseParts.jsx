import CoursePart from "./CoursePart";

export default function CourseParts({course}) {
  return (
    <ul>
        {course.parts.map(({ name, exercises }) => {
          return <CoursePart part={name} exercises={exercises} key={name} />;
        })}
      </ul>
  )
}
