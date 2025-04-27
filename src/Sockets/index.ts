import { Server } from "socket.io";
import redis from "../Config/redis";
import { Task } from "../Types/task";
import { insertManyToMongo } from "../Services/mongoService";

const REDIS_KEY = process.env.REDIS_KEY || "FULLSTACK_TASK_HEMANT";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("add", async (taskContent: string) => {
      try {
        const existing = await redis.get(REDIS_KEY);
        let taskList: Task[] = existing ? JSON.parse(existing) : [];

        const newTask: Task = {
          content: taskContent,
          timestamp: new Date().toISOString(),
        };

        taskList.push(newTask);

        // If task count exceeds 50, move to MongoDB and flush Redis
        if (taskList.length > 50) {
          await insertManyToMongo(taskList);
          await redis.del(REDIS_KEY);
          console.log("Moved 50+ tasks to MongoDB");
        } else {
          await redis.set(REDIS_KEY, JSON.stringify(taskList));
          console.log(`Added task to Redis: "${taskContent}"`);
        }
      } catch (err) {
        console.error('Error processing "add" event:', err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
