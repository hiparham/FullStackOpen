import { AddDiary } from "../Helpers/DiaryHelper";
import { NewDiary, Visibility, Weather } from "../Helpers/Types";

export default function DiaryForm() {
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const date = formData.get("date") as string;
    const weather = formData.get("weather") as Weather;
    const visibility = formData.get("visibility") as Visibility;
    const comment = formData.get("comment") as string;
    const newEntry: NewDiary = { date, weather, visibility, comment };
    AddDiary(newEntry).then((response) => {
      console.log(response, "SERVER");
    });
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[.5rem] mb-[2rem]"
      >
        <input
          type="text"
          name="visibility"
          placeholder="Visibility"
          className="bg-zinc-800 text-zinc-200 placeholder:text-zinc-400 py-3 px-2"
        />
        <input
          type="text"
          placeholder="Weather"
          name="weather"
          className="bg-zinc-800 text-zinc-200 placeholder:text-zinc-400 py-3 px-2"
        />
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
