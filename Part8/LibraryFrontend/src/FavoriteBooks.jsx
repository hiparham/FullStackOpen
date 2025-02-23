import { getmyFavorites } from "./Queries";
import { useQuery } from "@apollo/client";
export default function FavoriteBooks() {
  const { data } = useQuery(getmyFavorites);
  return (
    <section>
      {data && data.getFavorites && data.getFavorites.length > 0 && (
        <div className="mt-[5vh]">
          <h1 className="text-center mb-[1rem] text-[1.05rem] text-blue-600">
            Books in your favorite genre
          </h1>
          <ul>
            {data.getFavorites.map((f) => {
              return <li key={f.title}>{f.title}</li>;
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
