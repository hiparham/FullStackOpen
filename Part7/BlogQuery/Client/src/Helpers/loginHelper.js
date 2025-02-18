import axios from "axios";
const Base_url = "/api";
const loginUser = async (item) => {
  const userInfo = await axios.post(Base_url + "/login", item);
  return userInfo;
};
export {loginUser}