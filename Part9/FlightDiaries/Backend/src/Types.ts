export type Weather = "sunny" | "rainy" | "windy" | "cloudy" | "stormy";
export type Visibility = "poor" | "good" | "great" | "ok";
export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}
export type NewEntry = Omit<DiaryEntry, "id">;
export type nonsensitivediary = Omit<DiaryEntry, "comment">;
