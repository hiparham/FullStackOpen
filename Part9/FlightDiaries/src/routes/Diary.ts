import express, { Response } from "express";
import { addDiary, findById, getNonsensitive } from "../services/DiaryService";
import { newDiaryEntry, NonSensitiveDiary } from "../types";
const router = express.Router();
//
router.get("/", (_req, res: Response<NonSensitiveDiary[]>) => {
  res.json(getNonsensitive());
});
//
router.get("/:id", (_req, res) => {
  const diary = findById(Number(_req.params.id));
  if (diary) {
    res.json(diary);
  } else {
    res.json({ message: "No Diary Found" });
  }
});
//
router.post("/", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { weather, visibility, comment, date } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newEntry: newDiaryEntry = { weather, visibility, comment, date };
  const addedEntry = addDiary(newEntry);
  res.json(addedEntry);
});
export default router;
