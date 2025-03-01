type Weather = "sunny" | "rainy" | "stormy" | "cloudy" | "windy";

type Visibility = "great" | "good" | "poor" | "ok";

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NonSensitiveDiary = Omit<DiaryEntry, "comment">;
