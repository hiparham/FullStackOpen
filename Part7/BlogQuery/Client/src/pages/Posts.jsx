import { useContext } from "react";
import { Link } from "react-router";
import { BlogContext } from "../BlogAppContext";
import PageWrapper from "../Components/PageWrapper";
import { useQuery } from "@tanstack/react-query";
import { GetAllBlogs } from "../Helpers/BlogsHelper";

export default function Users() {
  const { data } = useQuery({
    queryKey: ["Blogs"],
    queryFn: GetAllBlogs,
  });
  return (
    <div>
      <PageWrapper>
        {data && data.length > 0 && (
          <>
            <ul className="py-[2rem] flex flex-col gap-[2rem]">
              {data.map((post) => {
                return (
                  <li key={post.id} className="py-4 px-2 shadow-md rounded-md">
                    <Link
                      to={`/posts/${post.id}`}
                      className="flex items-center justify-between"
                    >
                      <p className="font-semibold capitalize">{post.title}</p>
                      <p>Likes : {post.likes}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </PageWrapper>
    </div>
  );
}
