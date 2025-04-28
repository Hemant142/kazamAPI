"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllFrmMongo = exports.insertManyToMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const collectionName = process.env.MONGO_COLLECTION || "assignment_yadav";
const taskScema = new mongoose_1.default.Schema({
    content: { type: String, required: true },
    timestamp: { type: String, required: true },
});
const TaskModel = mongoose_1.default.model("Task", taskScema, collectionName);
const insertManyToMongo = (tasks) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield TaskModel.insertMany(tasks);
    }
    catch (error) {
        console.error("Failed to insert tasks to MongoDB:", error);
    }
});
exports.insertManyToMongo = insertManyToMongo;
const fetchAllFrmMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    return TaskModel.find().sort({ timeStamp: -1 }).lean();
});
exports.fetchAllFrmMongo = fetchAllFrmMongo;
