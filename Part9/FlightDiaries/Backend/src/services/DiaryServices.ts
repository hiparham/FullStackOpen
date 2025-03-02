import { data as alldiaries } from "../../data/entries";
import { NewEntry, nonsensitivediary } from "../Types";
import { DiaryEntry } from "../Types";
const getAllDiaries = (): nonsensitivediary[] => {
  return alldiaries.map(({ id, weather, visibility, date }) => {
    return { id, weather, visibility, date };
  });
};
const getDiary = (id: number): DiaryEntry | undefined => {
  const findItem = alldiaries.find((x) => x.id === id);
  return findItem;
};
const addDiary = (entry: NewEntry): DiaryEntry => {
  const newDiary = {
    id: Math.max(...alldiaries.map((x) => x.id)) + 1,
    ...entry,
  };
  alldiaries.push(newDiary);
  return newDiary;
};
export { getAllDiaries, addDiary, getDiary };
