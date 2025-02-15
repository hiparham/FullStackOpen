import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAllItems, voteItem } from "./helpers";
const App = () => {
  const queryClient = useQueryClient();
  const { data, isPending, isError } = useQuery({
    queryKey: ["Anecdotes"],
    queryFn: getAllItems,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const voteMutation = useMutation({
    mutationFn: voteItem,
    onSuccess: (newItem) => {
      const allNotes = queryClient.getQueryData(["Anecdotes"]);
      queryClient.setQueryData(
        ["Anecdotes"],
        allNotes.map((x) => (x.id === newItem.id ? newItem : x))
      );
    },
  });

  console.log("Hi");

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
  };

  if (isPending) {
    return <h1>Loading...!</h1>;
  }

  if (isError) {
    return <h1>Sorry, Something went wrong!</h1>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {data && (
        <>
          {data.map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default App;
