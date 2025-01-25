import { useState } from "react";
import VoteButton from "./VoteButton";
import NextButton from "./NextButton";
import Anecdote from "./Anecdote";
import BestAnecdote from "./BestAnecdote";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  function randomize() {
    let num = Math.floor(Math.random() * anecdotes.length);
    while (num === selected) {
      num = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(num);
  }

  function giveVote(x) {
    const newVotes = { ...votes, [x]: votes[x] ? votes[x] + 1 : 1 };
    setVotes(newVotes);
  }

  return (
    <section>
      <Anecdote votes={votes} anecdotes={anecdotes} selected={selected} />
      <VoteButton giveVote={giveVote} selected={selected} />
      <NextButton randomize={randomize} />
      <BestAnecdote votes={votes} anecdotes={anecdotes} />
    </section>
  );
};

export default App;
