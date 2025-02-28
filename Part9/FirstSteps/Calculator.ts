type op = "addition" | "division" | "multiplication" | "subtraction";
const Calculator = (
  value_1: number,
  value_2: number,
  operation: op
): number => {
  switch (operation) {
    case "addition": {
      return value_1 + value_2;
    }
    case "subtraction": {
      return value_1 - value_2;
    }
    case "multiplication": {
      return value_1 * value_2;
    }
    case "division": {
      if (value_2 === 0) throw new Error("Cannot divide by Zero");
      return value_1 / value_2;
    }
    default: {
      return 0;
    }
  }
};
export default Calculator;
