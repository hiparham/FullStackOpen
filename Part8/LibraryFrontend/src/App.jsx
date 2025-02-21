import { Route, Routes } from "react-router";
import Home from "./Home";
import Navbar from "./Navbar";
import Authors from "./Authors";
import NewBook from "./NewBook";

export default function App() {
  return (
    <main className="max-w-screen-md mx-auto w-11/12">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/new" element={<NewBook />} />
      </Routes>
    </main>
  );
}
