export type Weather = "sunny" | "rainy" | "windy" | "cloudy" | "stormy";
export type Visibility = "poor" | "good" | "ok" | "great";
export interface Diary {
  id: number;
  weather: Weather;
  visibility: Visibility;
  date: string;
}
