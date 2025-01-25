import StaticLine from "./StaticLine";

export default function Stats({ allZero, positives, average, all }) {
  return (
    <p>
      {allZero ? (
        "Start Voting | No Feedback Given yet."
      ) : (
        <div className="cont">
          <StaticLine txt="average" number={average} />
          <StaticLine txt="positive" number={`${positives}%`} />
          <StaticLine txt="all" number={all} />
        </div>
      )}
    </p>
  );
}
