import { isNan } from "./isNan";

interface ExerciseSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const parseArguments = (args: string[]) => {
  if (args.length < 4) {
    throw new Error("Missing target or days");
  }
  if (isNan(Number(args[2])) || args.slice(3).some((x) => isNaN(Number(x)))) {
    throw new Error("Invalid inputs");
  }
  return { target: Number(args[2]), days: args.slice(3).map((x) => Number(x)) };
};
const giveRating = (target: number, average: number): 1 | 2 | 3 => {
  return average >= target ? 3 : average < target / 2 ? 1 : 2;
};

const giveRatingDescription = (rate: number): string => {
  return rate === 1
    ? "Too bad, you are undertrained"
    : rate === 2
    ? "Not too bad, but still need to improve"
    : "You are all set!";
};

const calculateExercises = (
  days: number[],
  target: number
): ExerciseSummary => {
  const periodLength: number = days.length;
  const trainingDays: number = days.filter((x) => x !== 0).length;
  const average: number =
    days.reduce((acc, curr) => (acc += curr), 0) / days.length;
  const success: boolean = average >= target;
  const rating: number = giveRating(target, average);
  const ratingDescription: string = giveRatingDescription(rating);
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
try {
  const { days, target } = parseArguments(process.argv);
  console.log(calculateExercises(days, target));
} catch (error: unknown) {
  let err = "Something went wrong :";
  if (error instanceof Error) {
    err += error.message;
  }
  console.log(err);
}
