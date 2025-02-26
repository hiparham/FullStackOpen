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
        ? "Not bad, but still didnt meet the target"
        : "You are undertrained",
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
