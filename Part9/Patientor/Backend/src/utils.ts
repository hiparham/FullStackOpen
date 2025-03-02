import { Gender, NewPatientEntry } from "./Types";

const isString = (str: unknown): str is string => {
  return typeof str === "string" || str instanceof String;
};
const ParseField = (field: unknown, value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error(`${field} invalid`);
  }
  return value;
};
const isGender = (value: string): value is Gender => {
  return Object.values(Gender)
    .map((x) => x.toString())
    .includes(value);
};
const parseGender = (value: unknown): Gender => {
  if (!value || !isString(value) || !isGender(value)) {
    throw new Error("Incorrect Gender");
  }
  return value;
};

const toNewPatient = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object")
    throw new Error("Missing or invalid fields");
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    return {
      name: ParseField("name", object.name),
      dateOfBirth: ParseField("dateOfBirth", object.dateOfBirth),
      ssn: ParseField("ssn", object.ssn),
      gender: parseGender(object.gender),
      occupation: ParseField("occupation", object.occupation),
    };
  } else {
    throw new Error("Bad/Invalid inputs");
  }
};
export { toNewPatient };
