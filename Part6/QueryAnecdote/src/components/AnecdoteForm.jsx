import { useQueryClient, useMutation } from "@tanstack/react-query";
import { postAnecdote } from "../helpers";
import { useContext } from "react";
import AnecdoteContext from "../AnecdoteContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useContext(AnecdoteContext);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newPost.mutate(content);
    dispatch({ type: "Notification", payload: `${content} Added!` });
    setTimeout(() => {
      dispatch({ type: "CleanUp" });
    }, 2000);
  };

  const newPost = useMutation({
    mutationFn: postAnecdote,
    onSuccess: (newPost) => {
      const all = queryClient.getQueryData(["Anecdotes"]);
      queryClient.setQueryData(["Anecdotes"], [...all, newPost]);
    },
    onError: (error) => {
      dispatch({ type: "Notification", payload: error.response.data.error });
      setTimeout(() => {
        dispatch({ type: "CleanUp" });
      }, 2000);
    },
  });

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
