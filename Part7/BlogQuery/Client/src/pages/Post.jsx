import { useParams } from "react-router";
import PageWrapper from "../Components/PageWrapper";
import { useQuery } from "@tanstack/react-query";
import { getSingleBlog } from "../Helpers/BlogsHelper";

export default function Post() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["SinglePost"],
    retry: 2,
    queryFn: () => {
      return getSingleBlog(id);
    },
  });
  if (!data) return null;
  return (
    <PageWrapper>
      <h1>{data.title}</h1>
      <p>Created By {data.author}</p>
      <p>Has {data.likes} likes</p>
      <a href={data.url}>go to post</a>
    </PageWrapper>
  );
}
