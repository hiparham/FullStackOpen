export enum Gender {
  M = "male",
  F = "female",
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export type PatientShow = Omit<PatientEntry, "ssn">;
export type NewPatientEntry = Omit<PatientEntry, "id">;
