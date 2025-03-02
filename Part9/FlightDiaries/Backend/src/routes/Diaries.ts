import express, { Response } from "express";
import { getAllDiaries } from "../services/DiaryServices";
import { nonsensitivediary } from "../Types";
const router = express.Router();

router.get("/", (_req, res: Response<nonsensitivediary[]>) => {
  res.json(getAllDiaries());
});

router.post("/", (_req, res) => {
  res.send("Post");
});

export default router;
