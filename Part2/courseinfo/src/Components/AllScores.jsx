export default function AllScores({ exercises }) {
  const allScores = exercises
    .map((x) => x.exercises)
    .reduce((acc, curr) => acc + curr);
  return <p>Total of {allScores} exercises.</p>;
}
