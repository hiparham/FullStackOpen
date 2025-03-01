import Patients, {
  Patient,
  PatientDisplay,
  PatientEntry,
} from "../../data/patients";
import { generateId } from "../utils";

const getPatients = (): PatientDisplay[] => {
  return Patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (newEntry: PatientEntry): Patient => {
  const id: string = generateId();
  const newPatient = { id, ...newEntry };
  Patients.push(newPatient);
  return newPatient;
};

export { getPatients, addPatient };
