import Content from "./Components/Content";
import Header from "./Components/Header";
import Total from "./Components/Total";
import { courseParts } from "./Types";
const courseName = "Half Stack application development";
const App = () => {
  return (
    <div>
      <Header title={courseName} />
      <Content courses={courseParts} />
      <Total exercises={courseParts} />
    </div>
  );
};
export default App;
