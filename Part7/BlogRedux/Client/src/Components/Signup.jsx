import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanUp,
  errorNotif,
  showLogin,
  signUp,
  successNotif,
} from "../store/BlogStore";

export default function Signup() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.Notification);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  async function handleSignup(e) {
    e.preventDefault();
    try {
      await dispatch(signUp({ username, name, password }));
      dispatch(
        successNotif(`Hello ${username}! you're being redirected to login now`)
      );
      setTimeout(() => {
        dispatch(showLogin());
        dispatch(cleanUp());
      }, 2000);
    } catch (error) {
      dispatch(errorNotif(error.response.data.message));
    }
  }
  return (
    <form
      onSubmit={handleSignup}
      className="shadow-md flex flex-col gap-[1.2rem] p-8 mx-auto"
    >
      <h1 className="text-center font-semibold">Sign Up | BlogApp</h1>
      {notification && (
        <p
          className={`py-2 text-center text-white ${
            notification.success ? "bg-emerald-400" : "bg-red-500"
          }`}
        >
          {notification.text}
        </p>
      )}
      <input
        type="text"
        placeholder="Your name"
        className="py-2 border-b border-b-zinc-200 pb-3 outline-none focus:border-b-black"
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
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
        Sign Up
      </button>
      <button
        type="button"
        className="text-left cursor-pointer text-blue-700"
        onClick={() => {
          dispatch(showLogin());
        }}
      >
        Login instead
      </button>
    </form>
  );
}
