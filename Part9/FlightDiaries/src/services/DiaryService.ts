import { Diaries } from "../../data/entries";
import { DiaryEntry, NonSensitiveDiary } from "../types";

const getAllDiaries = (): DiaryEntry[] => Diaries;

const getNonsensitive = (): NonSensitiveDiary[] => {
  return Diaries.map(({ id, date, visibility, weather }) => ({
    id,
    date,
    visibility,
    weather,
  }));
};

const addDiary = () => {
  return null;
};

export { getAllDiaries, addDiary, getNonsensitive };
