/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Response } from "express";
import { addDiary, getAllDiaries, getDiary } from "../services/DiaryServices";
import { nonsensitivediary } from "../Types";
import { toNewDiary } from "../utils";
const router = express.Router();

router.get("/", (_req, res: Response<nonsensitivediary[]>) => {
  res.json(getAllDiaries());
});

router.get("/:id", (req, res) => {
  const diary = getDiary(Number(req.params.id));
  if (diary) {
    res.json(diary);
  } else {
    res.status(404).json({ message: "No item found" });
  }
});

router.post("/", (req, res) => {
  const newEntry = toNewDiary(req.body);
  const addedEntry = addDiary(newEntry);
  res.json(addedEntry);
});

export default router;
