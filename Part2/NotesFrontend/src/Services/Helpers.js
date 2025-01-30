const Base_URL = "/api/notes";

import axios from "axios";
const GetAllItems = () => {
  const request = axios.get(Base_URL);
  return request.then((response) => response.data);
};
const postNewItem = (newItem) => {
  const request = axios.post(Base_URL, newItem);
  return request.then((x) => x.data);
};
const EditOldItem = (id, newItem) => {
  const request = axios.put(Base_URL + "/" + id, newItem);
  return request.then((x) => x.data);
};
export { GetAllItems, postNewItem, EditOldItem };
