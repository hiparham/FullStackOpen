import express, { Request, Response } from "express";
import { addPatient, getAllPatients } from "../services/PatientServices";
import { NewPatient } from "../Types";
import { AddPatientMiddleware } from "../Middleware";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(getAllPatients());
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
