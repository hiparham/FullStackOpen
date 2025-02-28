import { isNumber } from "./utils";

const parseNumbers = (height: number, weight: number) => {
  if (isNumber(Number(height)) && isNumber(Number(weight))) {
    return { heightInMeters: +height / 100, weightinKg: +weight };
  }
  throw new Error("Height & Weight must be valid numbers.");
};

const bmiCalculate = (height: number, weight: number): string => {
  const { heightInMeters, weightinKg } = parseNumbers(height,weight);
  const bmi: number = Number(weightinKg / heightInMeters ** 2);
  if (bmi < 18.5) {
    return "Underweight";
  }
  if (bmi >= 18.5 && bmi < 25) {
    return "Normal Range";
  }
  if (bmi >= 25) {
    return "Overweight";
  }
  return "Unknown error occured";
};
if (require.main === module) {
  try {
    const height: number = Number(process.argv[2]);
    const weight: number = Number(process.argv[3]);
    console.log(bmiCalculate(height, weight));
  } catch (error: unknown) {
    let err: string = "Something Went Wrong :";
    if (error instanceof Error) {
      err += error.message;
    }
    console.log(err);
  }
}

export { bmiCalculate };
