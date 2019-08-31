/* eslint-disable no-console */
import dayjs from "dayjs";
import express from "express";
import { Server } from "http";
import SocketIO from "socket.io";

function timestamp(): number {
  return dayjs().unix();
}

const app = express();
const server = new Server(app);
const io = SocketIO(server);

app.get("/", (_req, res) => {
  res.send("Server Listening");
});

io.on("connection", socket => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
    socket.leaveAll();
  });

  socket.on("join", message => {
    socket.join(message.room);
    socket.broadcast
      .to(message.room)
      .emit("message", { user: "System", content: `Anonymous joined to this room`, timestamp: timestamp() });
  });

  socket.on("leave", message => {
    socket.leave(message.room);
    socket.broadcast
      .to(message.room)
      .emit("message", { user: "System", content: `Anonymous leaved from this room`, timestamp: timestamp() });
  });

  socket.on("message", message => {
    socket.broadcast
      .to(message.room)
      .emit("message", { user: "Anonymous", content: message.content, timestamp: timestamp() });
  });
});

server.listen(3002, () => {
  console.log("server listening at http://localhost:3002");
});
