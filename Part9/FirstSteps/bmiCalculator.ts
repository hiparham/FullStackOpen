// Body Mass Index
interface BodyInfo {
  height: number;
  weight: number;
}

const parseNumbers = (args: number[]): BodyInfo => {
  if (!isNaN(args[0]) && !isNaN(args[1]) && args.length === 2) {
    return { height: args[0], weight: args[1] };
  } else {
    throw new Error("Weight & Height must be valid numbers");
  }
};

const calculateBmi = (info: number[]): string => {
  const { height, weight } = parseNumbers(info);
  const result = weight / ((height / 100) * (height / 100));
  if (result < 18.5) {
    return "Underweight";
  }
  if (result >= 18.5 && result < 25) {
    return "Normal Range";
  }
  if (result >= 25) {
    return "Overweight";
  }
  return "Something went wrong";
};

try {
  console.log(calculateBmi([Number(process.argv[2]), Number(process.argv[3])]));
} catch (error: unknown) {
  let err: string = "Something went wrong : ";
  if (error instanceof Error) {
    err += error.message;
  }
  console.log(err);
}
