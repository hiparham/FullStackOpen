/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
type opType = "addition" | "subtraction" | "multiplication" | "division";
import { bmiCalculate } from "./bmiCalculate";
import Calculator from "./Calculator";
import { calculateExercises, exerciseSummary } from "./calculateExercises";
const app = express();
app.use(express.json());
// Hello!
app.get("/hello", (_req, res) => {
  res.send("Hello Fullstack!");
});
// WEBMI
app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.status(400).json({ message: "Malformatted height or weight" });
  }
  const bmi = bmiCalculate(Number(height), Number(weight));
  res.json({ height, weight, bmi });
});
//
app.post("/calculate", (req, res) => {
  const { value_1, value_2, operation } = req.body;
  if (
    isNaN(+value_1) ||
    isNaN(+value_2) ||
    typeof operation !== "string" ||
    !operation ||
    !["division", "addition", "subtraction", "multiplication"].includes(
      operation
    )
  ) {
    res.status(400).json({ message: "Malformatted Parameters" });
  }
  // Type assertion
  const op = operation as opType;
  const calculated: number = Calculator(Number(value_1), Number(value_2), op);
  res.status(201).json({ answer: calculated });
});
// Exercises API
app.post("/exercises", (req, res) => {
  const { exercises, target } = req.body;
  const exercisesTyped: number[] = exercises;
  const targetTyped: number = target;
  if (
    !exercisesTyped ||
    !target ||
    isNaN(targetTyped) ||
    !Array.isArray(exercisesTyped)
  ) {
  res.status(400).json({ message: "Missing parameters" });
  }
  const calculatedExercises: exerciseSummary = calculateExercises(
    exercisesTyped,
    targetTyped
  );
  res.json(calculatedExercises);
});
//
app.listen(3001, () => {
  console.log("Server ON");
});
