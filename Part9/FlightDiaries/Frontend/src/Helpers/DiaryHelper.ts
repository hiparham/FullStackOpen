import axios from "axios";

import { Diary, NewDiary } from "./Types";
const Base_Url = "/api/diaries";
const GetAllDiaries = async (): Promise<Diary[]> => {
  const init = await axios.get(Base_Url);
  return init.data;
};
const AddDiary = async (content: NewDiary): Promise<Diary> => {
  const init = await axios.post(Base_Url, content);
  return init.data;
};
export { GetAllDiaries, AddDiary };
