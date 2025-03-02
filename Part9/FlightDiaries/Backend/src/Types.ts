import { z } from "zod";

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
export const newEntrySchema = z.object({
  date: z.string().date(),
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  comment: z.string().optional(),
});

export type NewEntry = z.infer<typeof newEntrySchema>;

export interface DiaryEntry extends NewEntry {
  id: number;
}
export type nonsensitivediary = Omit<DiaryEntry, "comment">;
