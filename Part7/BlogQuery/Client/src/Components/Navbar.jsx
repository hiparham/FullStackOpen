import { useState } from "react";
import { Link, NavLink } from "react-router";
import hm from "../assets/Menuicon.svg";

const navLinks = [
  {
    txt: "home",
    url: "/",
  },
  {
    txt: "posts",
    url: "/posts",
  },
  {
    txt: "users",
    url: "/users",
  },
];
function Navlink({ url, txt }) {
  return (
    <NavLink
      end
      to={url}
      className={({ isActive }) =>
        `capitalize block ${isActive ? "text-blue-500" : ""} text-[1.05rem]`
      }
    >
      {txt}
    </NavLink>
  );
}
export default function Navbar() {
  const [show, setShow] = useState(false);

  return (
    <nav className="py-4 md:py-6 shadow-md bg-white">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto w-11/12 relative z-[100]">
        <Link to="/" className="text-lg font-bold">
          Blog
        </Link>
        <button
          className="cursor-pointer md:hidden"
          onClick={() => setShow(!show)}
        >
          <img alt="hamburger menu" src={hm} className="max-w-[30px]" />
        </button>
        <ul className="hidden md:flex items-center gap-[2rem]">
          {navLinks.map((link) => {
            return <Navlink {...link} key={link.txt} />;
          })}
        </ul>
      </div>
      <ul
        className={`transition-all md:hidden duration-300 linear -translate-y-full fixed top-0  bg-white z-[80] ${
          show && "translate-y-0"
        } w-full flex flex-col gap-[2vh] pb-[60px] pt-[80px] justify-center items-center`}
      >
        {navLinks.map((link) => {
          return <Navlink {...link} key={link.txt} />;
        })}
      </ul>
    </nav>
  );
}
