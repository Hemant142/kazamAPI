import http from "http";
import dotenv from "dotenv";
dotenv.config();
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
const PORT = process.env.PORT || 4000;
import connection from "./Config/db";
import { setupSocket } from "./Sockets";
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
  },
});
setupSocket(io);


server.listen(PORT, async () => {
  connection();
  console.log(`Server is running on port ${PORT}`);
});
