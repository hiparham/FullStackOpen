export type Weather = "sunny" | "rainy" | "stormy" | "cloudy" | "windy";

export type Visibility = "great" | "good" | "poor" | "ok";

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}
export type newDiaryEntry = Omit<DiaryEntry, "id">;
export type NonSensitiveDiary = Omit<DiaryEntry, "comment">;
