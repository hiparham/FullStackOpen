import { isNumber } from "./utils";

interface ExerciseNumbers {
  workouts: number[];
  target: number;
}
export interface exerciseSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
enum Rating {
  Good = 3,
  Mediocre = 2,
  Bad = 1,
}
const parseNumbers = (args: string[]): ExerciseNumbers => {
  const target: number = +args[0];
  if (!isNumber(target)) {
    throw new Error("Invalid Target");
  }
  const allDay = args.slice(1).every((x) => isNumber(x));
  if (!allDay) {
    throw new Error("Invalid Days");
  }
  const days = args.slice(1).map((x) => +x);
  return { workouts: days, target };
};
const calculateRate = (average: number, target: number) => {
  if (average >= target) {
    return Rating.Good;
  } else if (average < target && average >= target / 2) {
    return Rating.Mediocre;
  } else {
    return Rating.Bad;
  }
};
const getRating = (rate: number): string => {
  switch (rate) {
    case 1: {
      return "You Are Undertrained";
    }
    case 2: {
      return "Not bad, but could improve";
    }
    case 3: {
      return "You Are All Set!!";
    }
    default: {
      return "Numbers not right";
    }
  }
};
export const calculateExercises = (
  exerciseHours: number[],
  target: number
): exerciseSummary => {
  const periodLength: number = exerciseHours.length;
  const trainingDays: number = exerciseHours.filter((x) => x !== 0).length;
  const average: number =
    exerciseHours.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const success: boolean = average >= target;
  const rating: Rating = calculateRate(average, target);
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: getRating(rating),
    target,
    average,
  };
};
if (require.main === module) {
  try {
    const { workouts, target } = parseNumbers(process.argv.slice(2));
    console.log(calculateExercises(workouts, target));
  } catch (error: unknown) {
    let err: string = "Somewehint Went Wrong :";
    if (error instanceof Error) {
      err += error.message;
    }
    console.log(err);
  }
}
