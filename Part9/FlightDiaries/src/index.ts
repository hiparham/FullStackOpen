import express from "express";
import DiaryRouter from "./routes/Diary";
const app = express();
const PORT = 3000;
app.get("/ping", (_req, res) => {
  res.send("Pong!");
});
app.use("/api/diaries", DiaryRouter);
app.listen(PORT, () => {
  console.log("Server Running");
});
