import { useQueryClient, useMutation } from "@tanstack/react-query";
import { postAnecdote } from "../helpers";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newPost.mutate(content);
  };

  const newPost = useMutation({
    mutationFn: postAnecdote,
    onSuccess: (newPost) => {
      const all = queryClient.getQueryData(["Anecdotes"]);
      queryClient.setQueryData(["Anecdotes"], [...all, newPost]);
    },
    onError: (error) => {
      console.log(error.response.data.error);
    },
  });

  return (
    <div>
      <h3>create new</h3>
      {newPost.isError && <p>{newPost.error.response.data.error}</p>}
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
