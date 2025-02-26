// Body Mass Index
const calculateBmi = (height: number, weight: number): string => {
  const result = weight / ((height / 100) * (height / 100));
  if (result < 18) {
    return "Underweight";
  }
  if (result > 18 && result < 25) {
    return "Normal Range";
  }
  if (result > 25) {
    return "Overweight";
  }
};
console.log(calculateBmi(180, 75));
