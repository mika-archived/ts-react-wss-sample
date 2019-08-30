/* eslint-disable no-console */
import express from "express";
import { Server } from "http";
import SocketIO from "socket.io";

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
    console.log(`user joined to ${message.room}`);
    socket.join(message.room);
  });

  socket.on("leave", message => {
    console.log(`user leaved from ${message.room}`);
    socket.leave(message.room);
  });

  socket.on("message", message => {
    console.log(`user send message from/to ${message.room} "${message.content}"`);
    socket.broadcast.to(message.room).emit("message", message.content);
  });
});

server.listen(3002, () => {
  console.log("server listening at http://localhost:3002");
});
