import express from "express";
import cors from "cors";
import DiagnoseRouter from "./routes/DiagnosesRoute";
import PatientRouter from "./routes/PatientsRoute";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/ping", (_req, res) => {
  res.send("pong!");
});
// Diagnoses Route
app.use("/api/diagnoses", DiagnoseRouter);
// Patients Route
app.use("/api/patients", PatientRouter);
//
app.listen(3001, () => {
  console.log("Server running");
});
