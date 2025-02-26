type operation = "addition" | "subtraction" | "multiplication" | "division";
const calculator = (a: number, b: number, type: operation): number => {
  switch (type) {
    case "addition": {
      return a + b;
    }
    case "subtraction": {
      return a - b;
    }
    case "multiplication": {
      return a * b;
    }
    case "division": {
      if (b === 0) throw new Error("Can't divide by 0");
      return a / b;
    }
    default: {
      throw new Error("Operation unknown");
    }
  }
};
