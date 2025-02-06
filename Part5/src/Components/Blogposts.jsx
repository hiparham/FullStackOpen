export default function Blogposts({ posts }) {
  return (
    <div>
      <ul>
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
