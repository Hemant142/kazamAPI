import mongoose from "mongoose";
import { Task } from "../Types/task";
const collectionName = process.env.MONGO_COLLECTION || "assignment_yadav";
const taskScema = new mongoose.Schema<Task>({
  content: { type: String, required: true },
  timestamp: { type: String, required: true },
});
const TaskModel = mongoose.model<Task>("Task", taskScema, collectionName);
export const insertManyToMongo = async (tasks: Task[]) => {
  try {
    await TaskModel.insertMany(tasks);
  } catch (error) {
    console.error("Failed to insert tasks to MongoDB:", error);
  }
};

export const fetchAllFrmMongo = async (): Promise<Task[]> => {
  return TaskModel.find().sort({ timestamp: -1 }).lean();
};
