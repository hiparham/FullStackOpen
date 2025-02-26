interface RatingSummary {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

const calculateExercises = (days: number[], target: number): RatingSummary => {
  const avg: number =
    days.reduce((acc, curr) => (acc += curr), 0) / days.length;
  type rate = 1 | 2 | 3;
  const rating: rate = avg >= target ? 3 : avg < target / 2 ? 1 : 2;
  return {
    periodLength: days.length,
    trainingDays: days.filter((x) => x > 0).length,
    success: avg >= target,
    target: target,
    average: avg,
    rating,
    ratingDescription:
      rating === 3
        ? "You are all set!"
        : rating === 2
        ? "Not bad, could be better"
        : "You are undertrained",
  };
};

const myArguments: number[] = process.argv.slice(2).map((x) => +x);

console.log(calculateExercises(myArguments.slice(0, -1), myArguments[0]));
