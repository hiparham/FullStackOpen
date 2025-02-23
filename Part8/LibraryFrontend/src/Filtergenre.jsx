import { getGenres } from "./Queries";
import { useQuery } from "@apollo/client";
export default function Filtergenre({ setCurrentGenre }) {
  const { data } = useQuery(getGenres);
  const genres = data && data.getGenre ? ["All", ...data.getGenre] : ["All"];
  function getVal(e) {
    const current = e.target.value;
    setCurrentGenre(current === "All" ? "" : current);
  }
  return (
    <div className="flex items-center  mb-[2rem] gap-[1rem]">
      <h1 className="font-semibold text-zinc-700">Genres : </h1>
      <select onChange={getVal} className="min-w-[100px] bg-zinc-100 py-2">
        {genres.map((genre) => {
          return <option key={genre}>{genre}</option>;
        })}
      </select>
    </div>
  );
}
