import express from "express";
import { addPatient, getAllPatients } from "../services/PatientServices";
import { toNewPatient } from "../utils";
const router = express.Router();
router.get("/", (_req, res) => {
  res.json(getAllPatients());
});
router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const patientAdded = addPatient(newPatient);
    res.status(201).json(patientAdded);
  } catch (error: unknown) {
    let err = "Something went wrong :";
    if (error instanceof Error) {
      err += error.message;
    }
    res.status(400).json({ message: err });
  }
});
export default router;
