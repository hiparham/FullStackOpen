import { useContext } from "react";
import { BlogContext } from "../BlogAppContext";

export default function Welcome() {
  const { userInfo } = useContext(BlogContext).state;
  if (!userInfo) return null;
  return <h1 className="text-2xl text-blue-700 capitalize">Hello {userInfo.name}</h1>;
}
