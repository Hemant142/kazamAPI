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
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const dotenv_1 = require("dotenv");
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./Config/db"));
const Sockets_1 = require("./Sockets");
(0, dotenv_1.configDotenv)();
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
(0, Sockets_1.setupSocket)(io);
const PORT = process.env.PORT || 9890;
server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    (0, db_1.default)();
    console.log(`Server is running on port ${PORT}`);
}));
