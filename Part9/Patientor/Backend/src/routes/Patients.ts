import express, { Request, Response } from "express";
import {
  addPatient,
  getAllPatients,
  getPatient,
} from "../services/PatientServices";
import { NewPatient, PatientEntry } from "../utils/Types";
import { AddPatientMiddleware } from "../utils/Middleware";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(getAllPatients());
});

router.get("/:id", (req, res) => {
  const Patient = getPatient(req.params.id) as PatientEntry;
  if (Patient) {
    res.json(Patient);
  } else {
    res.status(404).json({ message: "No Patient Found" });
  }
});

router.post(
  "/",
  AddPatientMiddleware,
  (req: Request<unknown, unknown, NewPatient>, res: Response) => {
    const patientAdded = addPatient(req.body);
    res.status(201).json(patientAdded);
  }
);

export default router;
