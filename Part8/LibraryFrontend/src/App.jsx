import { Route, Routes } from "react-router";
import Home from "./Home";
import Navbar from "./Navbar";
import Authors from "./Authors";
import NewBook from "./NewBook";
import Login from "./Login";
import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const tokenValue = localStorage.getItem("graphlibrary");
    setToken(tokenValue || "");
  }, [token]);
  return (
    <main className="max-w-screen-md mx-auto w-11/12">
      <Navbar set={setToken}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/new" element={<NewBook />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </main>
  );
}
