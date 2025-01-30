import axios from "axios";
const Base = "/api/persons";

const getAll = () => {
  const req = axios.get(Base);
  return req.then((response) => response.data);
};

const postPhoneNumber = (item) => {
  const req = axios.post(Base, item);
  return req.then((response) => response.data);
};

const deleteNumber = (id) => {
  const request = axios.delete(`${Base}/${id}`);
  return request;
};

const updateNumber = (id,item) => {
  const request = axios.put(`${Base}/${id}`, item);
  return request.then((response) => response.data);
};
export { getAll, postPhoneNumber, deleteNumber, updateNumber };
