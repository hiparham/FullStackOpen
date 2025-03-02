import { data as alldiaries } from "../../data/entries";
import { nonsensitivediary } from "../Types";
//import { DiaryEntry } from "../Types";
const getAllDiaries = (): nonsensitivediary[] => {
  return alldiaries.map(({ id, weather, visibility, date }) => {
    return { id, weather, visibility, date };
  });
};
const addDiary = () => null;
export { getAllDiaries, addDiary };
