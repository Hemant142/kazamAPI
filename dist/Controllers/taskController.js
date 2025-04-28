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
exports.getAllTask = void 0;
const dotenv_1 = require("dotenv");
const redis_1 = __importDefault(require("../Config/redis"));
const mongoService_1 = require("../Services/mongoService");
(0, dotenv_1.configDotenv)();
const REDI_KEY = process.env.REDIS_KEY || "FULLSTACK_TASK_HEMANT";
const getAllTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const redisData = yield redis_1.default.get(REDI_KEY);
        let tasks = [];
        if (redisData) {
            tasks = JSON.parse(redisData);
        }
        else {
            tasks = yield (0, mongoService_1.fetchAllFrmMongo)();
        }
        res.status(200).send({ tasks });
    }
    catch (error) {
        console.log(`failed to fetch:`, error);
        res.status(500).send(error);
    }
});
exports.getAllTask = getAllTask;
