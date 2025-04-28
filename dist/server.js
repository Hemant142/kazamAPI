"use strict";
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
const port = process.env.PORT || 8080;
server.listen(port, () => {
    (0, db_1.default)();
    console.log(`Server is running on port ${port}`);
});
