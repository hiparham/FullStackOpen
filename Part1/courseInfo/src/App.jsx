import Content from "./Content";
import Header from "./Header";
import Total from "./Total";
//
const App = () => {
  const course = {
    title: "Half Stack application development",
    parts: [
      { part: "Fundamentals of React", exercises: 10 },
      { part: "Using props to pass data", exercises: 7 },
      { part: "State of a component", exercises: 14 },
    ],
  };
  return (
    <div>
      <Header title={course.title} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
    </div>
  );
};
//
export default App;
