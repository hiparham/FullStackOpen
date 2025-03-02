import { NewEntry, Visibility, Weather } from "./Types";
const isString = (str: unknown): str is string =>
  typeof str === "string" || str instanceof String;
// Parsing Comment
const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error("Missing/Invalid Comment");
  }
  return comment;
};
// Parsing Date
const isDate = (str: string): boolean => {
  return Boolean(Date.parse(str));
};
const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Invalid/Missing Date");
  }
  return date;
};
// Parsing Weather
const isWeather = (string: string): string is Weather => {
  return Object.values(Weather)
    .map((x) => x.toString())
    .includes(string);
};
//
const parseWeather = (param: unknown): Weather => {
  if (!isString(param) || !isWeather(param)) {
    throw new Error("Invalid Weather type");
  }
  return param;
};
// Parsing Visibility
const isVisiblity = (str: string): str is Visibility => {
  return Object.values(Visibility)
    .map((x) => x.toString())
    .includes(str);
};
const parseVisibility = (param: unknown): Visibility => {
  if (!isString(param) || !isVisiblity(param)) {
    throw new Error("Invalid Visibility type");
  }
  return param;
};
//
const toNewDiary = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Missing/Invalid Data");
  }
  if (
    "date" in object &&
    "weather" in object &&
    "visibility" in object &&
    "comment" in object
  ) {
    return {
      date: parseDate(object.date),
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      comment: parseComment(object.comment),
    };
  } else throw new Error("Missing Or Wrong Fields");
};

export { toNewDiary };
