import { isNumber } from "./utils";

const parseNumbers = (height: string, weight: string) => {
  if (isNumber(height) && isNumber(weight)) {
    return { heightInMeters: +height / 100, weightinKg: +weight };
  }
  throw new Error("Height & Weight must be valid numbers.");
};

const bmiCalculate = (height: string, weight: string): string => {
  const { heightInMeters, weightinKg } = parseNumbers(height, weight);
  const bmi: number = +(weightinKg / heightInMeters ** 2);
  if (bmi < 18.5) {
    return "Underweight";
  }
  if (bmi >= 18.5 && bmi < 25) {
    return "Normal Range";
  }
  if (bmi >= 25) {
    return "Overweight";
  }
};

try {
  const height: string = process.argv[2];
  const weight: string = process.argv[3];
  console.log(bmiCalculate(height, weight));
} catch (error) {
  console.log(error);
}
