import express from "express";
import { calculateBmi } from "./BmiCalculator";
import { calculateExercises, ExerciseSummary } from "./ExerciseCalculator";
const app = express();
app.use(express.json());
// Basic Endpoint
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});
// Bmi Calculator
app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.status(400).json({ error: "Missing info about height/weight" });
  }
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: "Invalid height/weight" });
  }
  // If everything is alright, send the info!
  res.json({
    height,
    weight,
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});
// Exercise Calculator
app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).json({ error: "Missing Daily Exercises Or Target" });
  }
  if (isNaN(Number(target))) {
    res.status(400).json({ error: "Missing/invalid Target" });
  }
  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((x) => isNaN(Number(x)))
  ) {
    res.status(400).json({ error: "Missing/invalid days" });
  }
  const calculatedExercises: ExerciseSummary = calculateExercises(
    daily_exercises,
    target
  );

  res.status(201).json(calculatedExercises);
});
//
app.listen(3001, () => {
  console.log("Server running");
});
