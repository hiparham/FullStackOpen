import PropTypes from "prop-types";
import { useContext } from "react";
import { BlogContext } from "../BlogAppContext";
export default function LogOut() {
  const dispatch = useContext(BlogContext).dispatchblogauth;
  const logout = () => {
    dispatch({ type: "logout" });
  };
  return (
    <button
      onClick={logout}
      className="py-2 px-10 rounded-md shadow-md cursor-pointer bg-white text-black capitalize"
    >
      Log Out
    </button>
  );
}
LogOut.propTypes = {
  logout: PropTypes.func,
};
