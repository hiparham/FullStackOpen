import { AxiosError } from "axios";
import { AddDiary } from "../Helpers/DiaryHelper";
import { NewDiary, Visibility, Weather } from "../Helpers/Types";
import { useState } from "react";
import FormNotification from "./FormNotification";
import WeatherSection from "./Weathersection";
import VisibilitySection from "./VisibilitySection";
import RadioWrapper from "./RadioWrapper";

interface Err {
  code: string;
  path: string[];
}

export default function DiaryForm() {
  const [notif, setNotif] = useState("");
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const date = formData.get("date") as string;
    const weather = formData.get("weather") as Weather;
    const visibility = formData.get("visibility") as Visibility;
    const comment = formData.get("comment") as string;
    const newEntry: NewDiary = { date, weather, visibility, comment };
    AddDiary(newEntry)
      .then((response) => {
        console.log(response, "SERVER");
      })
      .catch((error: AxiosError) => {
        if (!error) return;
        const data = error.response?.data as Err[];
        const allErrors: string[] = data.map((error: Err) => {
          if (error && error.path) {
            return error.path[0];
          } else {
            return "Check Inputs Again";
          }
        });
        setNotif(allErrors.join(", "));
        setTimeout(() => {
          setNotif("");
        }, 1500);
      });
  }
  return (
    <div>
      <FormNotification notif={notif} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[.5rem] mb-[2rem]"
      >
        <RadioWrapper label="visibility">
          <VisibilitySection label="poor" />
          <VisibilitySection label="good" />
          <VisibilitySection label="great" />
          <VisibilitySection label="ok" />
        </RadioWrapper>
        <RadioWrapper label="weather">
          <WeatherSection label="sunny" />
          <WeatherSection label="rainy" />
          <WeatherSection label="windy" />
          <WeatherSection label="cloudy" />
          <WeatherSection label="stormy" />
        </RadioWrapper>
        <input
          type="text"
          placeholder="Date"
          name="date"
          className="bg-zinc-800 text-zinc-200 placeholder:text-zinc-400 py-3 px-2"
        />
        <input
          type="text"
          placeholder="Comment"
          name="comment"
          className="bg-zinc-800 text-zinc-200 placeholder:text-zinc-400 py-3 px-2"
        />
        <button className="bg-white py-3 mt-[1rem] cursor-pointer">
          Add Diary
        </button>
      </form>
    </div>
  );
}
