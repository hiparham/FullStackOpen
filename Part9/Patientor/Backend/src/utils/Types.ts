import { z } from "zod";

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
export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string().min(3,{message:"Real Credit card"}),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(3,{message:"Insert your job"}),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;
export type PatientShow = Omit<PatientEntry, "ssn">;