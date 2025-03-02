import express, { Request, Response } from "express";
import { addDiary, getAllDiaries, getDiary } from "../services/DiaryServices";
import { NewEntry, nonsensitivediary } from "../Types";
import { AddPostMiddleWare } from "../Middleware";

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

router.post(
  "/",
  AddPostMiddleWare,
  (req: Request<unknown, unknown, NewEntry>, res: Response) => {
    const newEntry = addDiary(req.body);
    res.status(201).json(newEntry);
  }
);

export default router;
