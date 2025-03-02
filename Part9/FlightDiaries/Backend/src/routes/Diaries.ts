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
  try {
    const diaryProperty = toNewDiary(req.body);
    const newEntry = addDiary(diaryProperty);
    res.status(201).json(newEntry);
  } catch (error: unknown) {
    let err = "Something went wrong :";
    if (error instanceof Error) err += error.message;
    res.status(400).json(err);
  }
});

export default router;
