import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Blogpost from "./Blogpost";
import {
  deleteBlogPost,
  GetAllBlogs,
  likeBlogPost,
} from "../Helpers/BlogsHelper";

export default function Blogposts() {
  const queryclient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["Blog"],
    refetchOnWindowFocus: false,
    retry: 2,
    queryFn: GetAllBlogs,
  });
  const postLike = useMutation({
    mutationFn: likeBlogPost,
    onSuccess: () => {
      queryclient.invalidateQueries(["Blog"]);
    },
  });
  const postDelete = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      queryclient.invalidateQueries(["Blog"]);
    },
  });
  const sorteditems = data && data.slice().sort((a, b) => b.likes - a.likes);
  //
  function updateLikes(x) {
    const newItem = { ...x, likes: x.likes + 1 };
    postLike.mutate(newItem);
  }
  //
  function deletePost(x) {
    postDelete.mutate(x);
  }
  if (!data) return null;
  return (
    <div>
      <ul className="mt-[2rem] flex flex-col gap-[2.5rem]">
        {sorteditems.map((post) => {
          return (
            <Blogpost
              key={post.title}
              post={post}
              updateLikes={updateLikes}
              postDel={deletePost}
            />
          );
        })}
      </ul>
    </div>
  );
}
