import express, { Response } from "express";
import { getPatients } from "../services/PatientService";
import { PatientDisplay } from "../../data/patients";
const router = express.Router();
router.get("/", (_req, res: Response<PatientDisplay[]>) => {
  res.json(getPatients());
});
export default router;
