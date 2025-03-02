import { NewEntry } from "./Types";

const toNewDiary = (object: unknown): NewEntry => {
  console.log(object, "Object");

  return {
    weather: "sunny",
    visibility: "good",
    date: "2025-3-2",
    comment: "Whatever, dumb",
  };
};

export { toNewDiary };
