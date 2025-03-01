import { v4 as uuid } from "uuid";
import { Gender, PatientEntry } from "../data/patients";
const generateId = (): string => uuid();
export { generateId };

const isString = (str: unknown): str is string => {
  if (!str || typeof str !== "string") {
    throw new Error("Not String");
  }
  return typeof str === "string";
};

const parseField = (type: string, field: unknown): string => {
  if (!field || !isString(field)) {
    throw new Error(`${type} Must exist`);
  }
  return field;
};
const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((x) => x.toString())
    .includes(gender);
};
const parseGender = (param: unknown): Gender => {
  if (!param || !isString(param) || !isGender(param)) {
    throw new Error("Gender must exist");
  }
  return param;
};
const toNewPatient = (object: unknown): PatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Unknown Request");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "occupation" in object &&
    "gender" in object
  ) {
    const newEntry = {
      name: parseField("name", object.name),
      dateOfBirth: parseField("dateOfBirth", object.dateOfBirth),
      ssn: parseField("ssn", object.ssn),
      occupation: parseField("occupation", object.occupation),
      gender: parseGender(object.gender),
    };
    return newEntry;
  }
  throw new Error("Missing fields");
};

export { toNewPatient };
