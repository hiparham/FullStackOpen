import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";
const getAllDiagnoses = async () => {
  const init = await axios.get<Diagnosis[]>(apiBaseUrl + "/diagnoses");
  return init.data;
};
export { getAllDiagnoses };
