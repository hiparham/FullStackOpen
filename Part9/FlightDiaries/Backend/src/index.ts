import express from "express";
import DiaryRouter from "./routes/Diaries";
const app = express();
app.use(express.json());
app.use("/api/diaries", DiaryRouter);
app.listen(3000, () => {
  console.log("Server Running http://localhost:3000");
});
