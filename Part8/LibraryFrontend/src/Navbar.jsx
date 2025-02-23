import { Link, NavLink } from "react-router";
import { useApolloClient } from "@apollo/client";
function NavbarLink({ txt, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${isActive ? "text-blue-800" : "text-zinc-400"} text-[1.05rem]`
      }
      end
    >
      {txt}
    </NavLink>
  );
}

export default function Navbar({ set }) {
  const client = useApolloClient();
  const logOut = () => {
    localStorage.removeItem("graphlibrary");
    client.clearStore();
    set("");
  };
  return (
    <nav className="flex items-center py-6 gap-[2rem]">
      <NavbarLink txt="Books" to="/" />
      <NavbarLink txt="Authors" to="/authors" />
      {localStorage.getItem("graphlibrary") && (
        <NavbarLink txt="Add Book" to="/new" />
      )}
      {!localStorage.getItem("graphlibrary") ? (
        <Link
          to="/login"
          className="ml-auto py-1.5 px-8 shadow-md rounded-md bg-sky-500 text-white"
        >
          Login
        </Link>
      ) : (
        <button
          className="ml-auto cursor-pointer bg-blue-800 text-white py-2 px-8"
          onClick={logOut}
        >
          Log Out
        </button>
      )}
    </nav>
  );
}
