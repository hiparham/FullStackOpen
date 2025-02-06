import { useState } from "react";
import { loginUser } from "../Helpers/loginHelper";

export default function LoginForm({ userInfo, setuserinfo }) {
  const [err, setErr] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await loginUser({ username, password });
      setuserinfo(data);
    } catch (error) {
      setErr("Wrong User Or Password");
      setTimeout(() => {
        setErr("");
      }, 2000);
    }
  }
  return (
    <form
      onSubmit={handleLogin}
      className="shadow-md flex flex-col gap-[1rem] p-8 mx-auto"
    >
      <h1 className="text-center font-semibold">BlogApp Login</h1>
      {err && (
        <p className="text-white py-2 bg-red-500 text-center px-1 my-[1rem]">
          {err}
        </p>
      )}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <input
        type="password"
        placeholder="Your Password"
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
