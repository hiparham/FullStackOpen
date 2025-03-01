import { Diaries } from "../../data/entries";
import {
  DiaryEntry,
  newDiaryEntry,
  NonSensitiveDiary,
} from "../types";

const getAllDiaries = (): DiaryEntry[] => Diaries;

const getNonsensitive = (): NonSensitiveDiary[] => {
  return Diaries.map(({ id, date, visibility, weather }) => ({
    id,
    date,
    visibility,
    weather,
  }));
};
const findById = (id: number): DiaryEntry | undefined => {
  return Diaries.find((x) => x.id === id);
};
// Post
const addDiary = (entry: newDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: Math.max(...Diaries.map((x) => x.id)) + 1,
    ...entry,
  };
  Diaries.push(newDiary);
  return newDiary;
};

export { getAllDiaries, addDiary, getNonsensitive, findById };
