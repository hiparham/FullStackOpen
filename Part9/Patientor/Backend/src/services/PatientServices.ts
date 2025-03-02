import allPatients from "../../data/patients";
import { PatientShow } from "../Types";
const getAllPatients = (): PatientShow[] => {
  return allPatients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

export { getAllPatients };
