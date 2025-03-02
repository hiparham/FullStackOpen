import express from "express";
import DiaryRouter from "./routes/Diaries";
import { ErrorHandler } from "./Middleware";
const app = express();
app.use(express.json());
app.use("/api/diaries", DiaryRouter);

app.use(ErrorHandler);

app.listen(3000, () => {
  console.log("Server Running http://localhost:3000");
});
