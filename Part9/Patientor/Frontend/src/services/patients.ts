import axios from "axios";
import { Patient, PatientFormValues, PatientSingle } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getPatient = async (id: string): Promise<PatientSingle> => {
  const init = await axios.get(apiBaseUrl + "/patients/" + id);
  return init.data;
};

export default {
  getAll,
  create,
  getPatient,
};
