import express from "express";
const router = express.Router();
import { getAllDiagnoses } from "../services/DiagnoseService";
router.get("/", (_req, res) => {
  res.json(getAllDiagnoses());
});
export default router;
