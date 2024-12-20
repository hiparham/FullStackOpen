// Header
const Header = ({ course }) => {
  return <h1>Course {course}</h1>;
};
// Content
const Content = ({ content }) => {
  return (
    <ul>
      {content.map(({ title, exercises }) => {
        return <Part title={title} exercises={exercises} />;
      })}
    </ul>
  );
};
// Bite-size Part

const Part = ({ title, exercises }) => {
  return (
    <li>
      <p>
        {title} - {exercises}
      </p>
    </li>
  );
};

// Total of exercises
const Total = ({ courses }) => {
  return (
    <p>
      Total Number of Exercises{" "}
      {courses.map((x) => x.exercises).reduce((acc, curr) => acc + curr)}
    </p>
  );
};
// Main ( Root Component )
const App = () => {
  const courseInfo = {
    title: "Half Stack application development",
    courses: [
      {
        title: "Fundamentals of React",
        exercises: 10,
      },
      {
        title: "Using props to pass data",
        exercises: 7,
      },
      {
        title: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={courseInfo.title} />
      <Content content={courseInfo.courses} />
      <Total courses={courseInfo.courses} />
    </div>
  );
};

export default App;
