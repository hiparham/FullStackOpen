import axios from "axios";
const Base_url = "/api";
const SignUpUser = async (info) => {
  const init = await axios.post(Base_url+"/users", info);
  return init.data;
};
export default SignUpUser;
