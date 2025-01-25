import { useState } from "react";
import VoteButton from "./VoteButton";
import VoteDisplay from "./VoteDisplay";
import Container from "./Container";
import Stats from "./Stats";
//
export default function App() {
  
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const allZero = good + bad + neutral === 0;
  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positives = (good * 100) / all;

  return (
    <Container>
      <Stats
        positives={positives}
        all={all}
        allZero={allZero}
        average={average}
      />
      <VoteDisplay good={good} bad={bad} neutral={neutral} />
      <VoteButton text="Good" GiveVote={() => setGood(good + 1)} />
      <VoteButton text="Bad" GiveVote={() => setBad(bad + 1)} />
      <VoteButton text="Neutral" GiveVote={() => setNeutral(neutral + 1)} />
    </Container>
  );
}
