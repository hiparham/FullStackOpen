import { CoursePart } from "../Types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const CourseHeader = ({ part }: { part: CoursePart }) => {
  return (
    <h3 className="course_header">
      {part.name} | {part.exerciseCount}
    </h3>
  );
};

export default function Part({ part }: { part: CoursePart }) {
  switch (part.kind) {
    case "basic": {
      return (
        <li>
          <CourseHeader part={part} />
          <p>{part.description}</p>
        </li>
      );
    }
    case "group": {
      return (
        <li>
          <CourseHeader part={part} />
          <p>Project Exercises {part.groupProjectCount}</p>
        </li>
      );
    }
    case "background": {
      return (
        <li>
          <CourseHeader part={part} />
          <p>{part.description}</p>
          <p>Submit to {part.backgroundMaterial}</p>
        </li>
      );
    }
    case "special": {
      return (
        <li>
          <CourseHeader part={part} />
          <p>{part.description}</p>
          <p>Required Skills : {part.requirements.join(" ")}</p>
        </li>
      );
    }
    default: {
      return assertNever(part);
    }
  }
}
