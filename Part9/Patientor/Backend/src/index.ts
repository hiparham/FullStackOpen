import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
import PatientsRouter from "./routes/Patients";
import DiagnosesRouter from "./routes/Diagnoses";
import { ErrorHandler } from "./Middleware";

app.use("/api/patients", PatientsRouter);
app.use("/api/diagnoses", DiagnosesRouter);

app.use(ErrorHandler);

app.listen(3001);
