import express from "express";
import { getAllTask } from "../Controllers/taskController";
const router = express.Router();

router.get("/", getAllTask);
export default router;
