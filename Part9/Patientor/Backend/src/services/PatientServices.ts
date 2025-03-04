import allPatients from "../../data/patients";
import { v4 as uuid } from "uuid";
const generateId = (): string => uuid();
import { NewPatient, PatientEntry, PatientShow } from "../utils/Types";

const getAllPatients = (): PatientShow[] => {
  return allPatients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const getPatient = (Patientid: string): PatientEntry | null => {
  const findPatient = allPatients.find((x) => x.id === Patientid);
  if (findPatient) {
    return findPatient;
  } else {
    return null;
  }
};

const addPatient = (patient: NewPatient): PatientShow => {
  const newPatient = { id: generateId(), ...patient, entries: [] };
  allPatients.push(newPatient);
  return newPatient;
};

export { getAllPatients, addPatient, getPatient };
