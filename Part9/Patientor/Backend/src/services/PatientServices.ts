import allPatients from "../../data/patients";
import { v4 as uuid } from "uuid";
const generateId = (): string => uuid();
import { NewPatientEntry, PatientShow } from "../Types";
const getAllPatients = (): PatientShow[] => {
  return allPatients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};
const addPatient = (patient: NewPatientEntry): PatientShow => {
  const newPatient = { id: generateId(), ...patient };
  allPatients.push(newPatient);
  return newPatient;
};
export { getAllPatients, addPatient };
