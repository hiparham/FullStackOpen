export default function VoteDisplay({ good, bad, neutral }) {
  return (
    <div>
      <p>
        Good  {good} | Bad  {bad} | Neutral  {neutral}
      </p>
    </div>
  );
}
