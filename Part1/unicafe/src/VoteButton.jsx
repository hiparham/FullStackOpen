export default function VoteButton({ text, GiveVote }) {
  return <button onClick={GiveVote}>{text}</button>;
}
