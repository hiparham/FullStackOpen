/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from "@apollo/client";
import { loginQuery } from "./Queries";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Login({ setToken }) {
  const navigate = useNavigate("");
  const [login, { data, error }] = useMutation(loginQuery);

  useEffect(() => {
    if (!data) return;
    localStorage.setItem("graphlibrary", data.login.value);
    setToken(data.login.value);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, [data]);

  async function handleLogin(e) {
    e.preventDefault();
    await login({
      variables: { username: e.target.user.value, password: e.target.pw.value },
    });
  }

  return (
    <div>
      {error && <p>Login Failed</p>}
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-[1rem] py-[5vh] max-w-[25rem] w-full mx-auto"
      >
        <input
          type="text"
          placeholder="Username"
          name="user"
          className="py-3 px-2 border border-zinc-200"
        />
        <input
          type="password"
          name="pw"
          placeholder="Password"
          className="py-3 px-2 border border-zinc-200"
        />
        <button className="bg-sky-600 text-white py-3 rounded-md cursor-pointer">
          Log in
        </button>
      </form>
    </div>
  );
}
