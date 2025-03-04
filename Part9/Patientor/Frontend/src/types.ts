export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export interface PatientSingle extends Patient {
  entries: Entry[];
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalEntry;

interface EntryBase {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}
enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
export interface HealthCheckEntry extends EntryBase {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
export interface HospitalEntry extends EntryBase {
  type: "Hospital";
  discharge: {
    date: string;
    criterie: string;
  };
}
export interface OccupationalEntry extends EntryBase {
  type: "OccupationalHealthcare";
  employerName: string;
  sichLeave: {
    startDate: string;
    endDate: string;
  };
}
export type PatientFormValues = Omit<Patient, "id" | "entries">;
