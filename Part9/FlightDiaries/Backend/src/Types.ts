export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Windy = "windy",
  Cloudy = "cloudy",
  Stormy = "stormy",
}
export enum Visibility {
  Poor = "poor",
  Good = "good",
  Great = "great",
  Ok = "ok",
}
export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}
export type NewEntry = Omit<DiaryEntry, "id">;
export type nonsensitivediary = Omit<DiaryEntry, "comment">;
