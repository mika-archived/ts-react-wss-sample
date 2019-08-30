import express from "express";
import { Server } from "http";
import SocketIO from "socket.io";

const app = express();
const server = new Server(app);
const io = SocketIO(app);

app.get("/", (_req, res) => {
  res.send("Server Listening");
});

server.listen(3002, () => {
  // eslint-disable-next-line no-console
  console.log("server listening at http://localhost:3002");
});

