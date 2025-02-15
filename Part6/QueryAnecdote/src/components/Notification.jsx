import { useContext } from "react";
import AnecdoteContext from "../AnecdoteContext";

const Notification = () => {
  const {
    state: { notification },
  } = useContext(AnecdoteContext);
  if (!notification) {
    return null;
  }
  return <div>{notification}</div>;
};

export default Notification;
