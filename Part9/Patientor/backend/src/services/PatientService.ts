import Patients, { PatientDisplay } from "../../data/patients";
const getPatients = (): PatientDisplay[] => {
  return Patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
export { getPatients };
