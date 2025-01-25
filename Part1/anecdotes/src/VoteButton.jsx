
export default function VoteButton({giveVote,selected}) {
  return <button onClick={() => giveVote(selected)}>Vote</button>;
}
