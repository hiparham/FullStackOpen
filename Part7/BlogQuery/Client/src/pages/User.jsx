import { useParams } from "react-router";
import PageWrapper from "../Components/PageWrapper";
import { useQuery } from "@tanstack/react-query";
import { getSingleUser } from "../Helpers/UsersHelper";

export default function User() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["User"],
    queryFn: () => {
      return getSingleUser(id);
    },
  });
  if (!data) return null;
  return (
    <PageWrapper>
      <h1 className="capitalize">Username : {data.username}</h1>
      <h1 className="capitalize">Name : {data.name}</h1>
      <p>Posts : {data.blogs.length === 0 && "0"}</p>
      <ul>
        {data.blogs.map((blog) => {
          return (
            <li key={blog.id}>
              <p>
                {blog.title} By {blog.author}
              </p>
            </li>
          );
        })}
      </ul>
    </PageWrapper>
  );
}
