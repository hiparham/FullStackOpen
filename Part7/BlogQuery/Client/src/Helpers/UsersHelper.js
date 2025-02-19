import axios from "axios";
const Base_url = "/api/users";

const getAllusers = async () => {
  const init = await axios.get(Base_url);
  return init.data;
};
const getSingleUser = async (id) => {
  const init = await axios.get(Base_url + "/" + id);
  return init.data;
};

export { getAllusers, getSingleUser };
