"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = void 0;
const redis_1 = __importDefault(require("../Config/redis"));
const mongoService_1 = require("../Services/mongoService");
const REDIS_KEY = process.env.REDIS_KEY || "FULLSTACK_TASK_HEMANT";
const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    socket.on("add", (taskContent) =>
      __awaiter(void 0, void 0, void 0, function* () {
        try {
          const existing = yield redis_1.default.get(REDIS_KEY);
          let taskList = existing ? JSON.parse(existing) : [];
          const newTask = {
            content: taskContent,
            timestamp: new Date().toISOString(),
          };
          taskList.push(newTask);
          // If task count exceeds 50, move to MongoDB and flush Redis
          if (taskList.length > 50) {
            yield (0, mongoService_1.insertManyToMongo)(taskList);
            yield redis_1.default.del(REDIS_KEY);
            console.log("Moved 50+ tasks to MongoDB");
          } else {
            yield redis_1.default.set(REDIS_KEY, JSON.stringify(taskList));
            console.log(`Added task to Redis: "${taskContent}"`);
          }
        } catch (err) {
          console.error('Error processing "add" event:', err);
        }
      })
    );
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
exports.setupSocket = setupSocket;
