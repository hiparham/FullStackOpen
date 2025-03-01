import express, { Response } from "express";
import { addDiary, findById, getNonsensitive } from "../services/DiaryService";
import { NonSensitiveDiary } from "../types";
import { toNewDiary } from "../utils";
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
  try {
    const newDiary = toNewDiary(req.body);
    const addedEntry = addDiary(newDiary);
    res.json(addedEntry);
  } catch (error: unknown) {
    let msg = "Something Went Wrong";
    if (error instanceof Error) {
      msg += error.message;
    }
    res.status(400).json({ message: msg });
  }
});
export default router;
