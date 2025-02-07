import { useState } from "react";
import { loginUser } from "../Helpers/loginHelper";

export default function LoginForm({ setuserinfo }) {
  const [err, setErr] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await loginUser({ username, password });
      setuserinfo(data);
    } catch () {
      setErr("Wrong User Or Password");
      setTimeout(() => {
        setErr("");
      }, 2000);
    }
  }
  return (
    <form
      onSubmit={handleLogin}
      className="shadow-md flex flex-col gap-[1.2rem] p-8 mx-auto"
    >
      <h1 className="text-center font-semibold">Please Log In | BlogApp</h1>
      {err && (
        <p className="text-white py-2 bg-red-500 text-center px-1 my-[1rem]">
          {err}
        </p>
      )}
      <input
        type="text"
        placeholder="Username"
        className="py-2 border-b border-b-zinc-200 pb-3 outline-none focus:border-b-black"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <input
        type="password"
        placeholder="Your Password"
        className="py-2 border-b border-b-zinc-200 pb-3 outline-none focus:border-b-black"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <button
        type="submit"
        className="bg-black py-3 rounded-md text-white cursor-pointer"
      >
        Login
      </button>
    </form>
  );
}
