type Operation = "m" | "d" | "a" | "s";
interface ParsedValues {
  num_1: number;
  num_2: number;
  op: Operation;
}
// Parsing Arguments for Calculator
const parseArguments = (args: string[]): ParsedValues => {
  if (args.length < 4) {
    throw new Error("Not Enough arguments");
  }
  if (isNaN(+args[2]) || isNaN(+args[3])) {
    throw new Error("Operand should be numbers");
  }
  if (!["m", "d", "a", "s"].includes(args[4])) {
    throw new Error("Wrong operator");
  }
  return {
    num_1: Number(args[2]),
    num_2: Number(args[3]),
    op: args[4] as Operation,
  };
};
//
const calculator = (
  value_1: number,
  value_2: number,
  op: Operation
): number => {
  switch (op) {
    case "m": {
      return value_1 * value_2;
    }
    case "a": {
      return value_1 + value_2;
    }
    case "s": {
      return value_1 - value_2;
    }
    case "d": {
      if (value_2 === 0) throw new Error("Cannot divide by Zero");
      return value_1 / value_2;
    }
    default: {
      throw new Error("Unknown Operation");
    }
  }
};
//
if (require.main === module) {
try {
  const { num_1, num_2, op } = parseArguments(process.argv);
  console.log(calculator(num_1, num_2, op));
} catch (error: unknown) {
  let err: string = "Something went Wrong : ";
  if (error instanceof Error) {
    err += error.message;
  }
  console.log(err);
}
}