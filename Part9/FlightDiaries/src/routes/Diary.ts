import express, { Response } from "express";
import { getNonsensitive } from "../services/DiaryService";
import { NonSensitiveDiary } from "../types";
const router = express.Router();

router.get("/", (_req, res: Response<NonSensitiveDiary[]>) => {
   res.json(getNonsensitive());
});

export default router;
