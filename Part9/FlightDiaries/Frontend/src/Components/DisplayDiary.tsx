import { Diary } from "../Helpers/Types";

export default function DisplayDiary({ diaries }: { diaries: Diary[] }) {
  if (!diaries || diaries.length < 1) return null;
  return (
    <section>
      <h2 className="text-white text-2xl font-[700]">Entries</h2>
      <ul className="flex flex-col gap-[2rem] py-[1rem]">
        {diaries.map((diary) => {
          return (
            <li key={diary.id} className="text-zinc-200">
              <h3 className="font-semibold text-[1.05rem]">{diary.date}</h3>
              <p>Visibility Was {diary.visibility}</p>
              <p>Weather Was {diary.weather}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
