
export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Stormy = "stormy",
  Cloudy = "cloudy",
  Windy = "windy",
}
export type newDiaryEntry = Omit<DiaryEntry, "id">;
export type NonSensitiveDiary = Omit<DiaryEntry, "comment">;
