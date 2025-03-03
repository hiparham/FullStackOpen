import { useEffect, useState } from "react";
import { GetAllDiaries } from "./Helpers/DiaryHelper";
import DisplayDiary from "./Components/DisplayDiary";
import { Diary } from "./Helpers/Types";
import DiaryForm from "./Components/DiaryForm";
import Header from "./Components/Header";

export default function App() {
  const [AllDiaries, setAll] = useState<Diary[]>([]);
  useEffect(() => {
    GetAllDiaries().then((response) => {
      setAll(response);
    });
  }, []);

  const AddNew = (x: Diary) => {
    setAll([...AllDiaries, x]);
  };

  return (
    <div className="bg-stone-900 min-h-screen">
      <main className="max-w-screen-lg mx-auto w-11/12">
        <Header />
        <DiaryForm AddNew={AddNew} />
        <DisplayDiary diaries={AllDiaries} />
      </main>
    </div>
  );
}
