import { configDotenv } from "dotenv";
import redis from "../Config/redis";
import { Task } from "../Types/task";
import { fetchAllFrmMongo } from "../Services/mongoService";
import { Request, Response } from "express";
configDotenv();

const REDI_KEY = process.env.REDIS_KEY || "FULLSTACK_TASK_HEMANT";

export const getAllTask = async (req: Request, res: Response) => {
  try {
    const redisData = await redis.get(REDI_KEY);
    let tasks: Task[] = [];
    if (redisData) {
      tasks = JSON.parse(redisData);
    } else {
      tasks = await fetchAllFrmMongo();
    }
    res.status(200).send({ tasks });
  } catch (error) {
    console.log(`failed to fetch:`, error);
    res.status(500).send(error);
  }
};
