import { z } from "zod";

export enum Gender {
  Male = "male",
  Female = "female",
}

export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: DiagnoseEntry["code"][];
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criterie: string;
  };
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sichLeave: {
    startDate: string;
    endDate: string;
  };
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string().min(3, { message: "Real Credit card" }),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(3, { message: "Insert your job" }),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export type PatientShow = Omit<PatientEntry, "ssn" | "entries">;
