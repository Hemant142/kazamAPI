import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import router from "./Routes/tasks";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/tasks", router);
app.get("/", (req: any, res: any) => {
  res.status(200).send(`Welcome to the KAZAM Backend`);
});
export default app;
