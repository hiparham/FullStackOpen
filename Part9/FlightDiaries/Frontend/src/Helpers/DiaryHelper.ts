import axios from "axios";
import { Diary } from "./Types";
const Base_Url = "/api/diaries";
const GetAllDiaries = async (): Promise<Diary[]> => {
  const init = await axios.get(Base_Url);
  return init.data;
};
export { GetAllDiaries };
