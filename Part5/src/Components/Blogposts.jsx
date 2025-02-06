export default function Blogposts({ posts }) {
  return (
    <div>
      <ul className="mt-[2rem] flex flex-col gap-[2.5rem]">
        {posts.map(({ title, url, author }) => {
          return (
            <li key={title}>
              <h3>{title}</h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
