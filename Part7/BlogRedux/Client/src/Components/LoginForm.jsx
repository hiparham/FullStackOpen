import { useState } from "react";
import { loginUser } from "../Helpers/loginHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  errorNotif,
  successNotif,
  cleanUp,
  showSignup,
  showApp,
  userlogin,
} from "../store/BlogStore";

export default function LoginForm({ setuserinfo }) {
  const status = useSelector((state) => state.status);
  const notification = useSelector((state) => state.Notification);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await loginUser({ username, password });
      dispatch(successNotif(`${data.username} Welcome`));
      setTimeout(() => {
        setuserinfo(data);
        dispatch(userlogin(data));
        dispatch(showApp());
        dispatch(cleanUp());
        setUsername("");
        setPassword("");
      }, 1500);
    } catch {
      dispatch(errorNotif("Something Went Wrong"));
      setTimeout(() => {
        dispatch(cleanUp());
      }, 2000);
    }
  }
  if (status !== "login") return null;
  return (
    <form
      onSubmit={handleLogin}
      className="shadow-md flex flex-col gap-[1.2rem] p-8 mx-auto"
    >
      <h1 className="text-center font-semibold">Please Log In | BlogApp</h1>
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
      <button
        type="button"
        className="text-left cursor-pointer text-blue-700"
        onClick={() => {
          dispatch(showSignup());
        }}
      >
        Don&apos;t have an account? Sign Up!
      </button>
    </form>
  );
}
