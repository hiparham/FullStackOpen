import { isNan } from "./isNan";

interface CalcParams {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): CalcParams => {
  if (args.length < 4) {
    throw new Error("Insert Height and Weight");
  }
  if (args.length > 4) {
    throw new Error("Too many arguments");
  }
  if (!isNan(args[2]) && !isNan(args[3])) {
    return { height: Number(args[2]), weight: Number(args[3]) };
  }
  throw new Error("Invalid height or weight");
};
export const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "You Are Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal Range";
  } else {
    return "You Are Overweight.";
  }
};
if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error) {
    let err = "Something went wrong :";
    if (error instanceof Error) {
      err += error.message;
    }
    console.log(err);
  }
}
