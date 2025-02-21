import {  NavLink } from "react-router";
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

export default function Navbar() {
  return (
    <nav className="flex items-center py-6 gap-[2rem]">
      <NavbarLink txt="Books" to="/" />
      <NavbarLink txt="Authors" to="/authors" />
    </nav>
  );
}
