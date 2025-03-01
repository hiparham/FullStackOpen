import express, { Response } from "express";
import { addPatient, getPatients } from "../services/PatientService";
import { PatientDisplay } from "../../data/patients";
import { toNewPatient } from "../utils";
const router = express.Router();
router.get("/", (_req, res: Response<PatientDisplay[]>) => {
  res.json(getPatients());
});
router.post("/", (req, res) => {
  try {
    const entry = toNewPatient(req.body);
    const newPatient = addPatient(entry);
    res.status(201).json(newPatient);
  } catch (error: unknown) {
    let err = "Something went wrong : ";
    if (error instanceof Error) {
      err += error.message;
    }
    res.status(400).json({ message: err });
  }
});
export default router;
