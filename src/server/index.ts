/* eslint-disable no-console */
import dayjs from "dayjs";
import express from "express";
import { Server } from "http";
import SocketIO from "socket.io";

import { JoinRequest, MessageResponse, LeaveRequest, MessageRequest } from "../type";

type LocalStore = {
  [id: string]: { username: string; currentRoomId: string };
};

function timestamp(): number {
  return dayjs().unix();
}

const app = express();
const server = new Server(app);
const io = SocketIO(server);
const store: LocalStore = {};

app.get("/", (_req, res) => {
  res.send("Server Listening");
});

io.on("connection", socket => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
    socket.leaveAll();
  });

  socket.on("join", (request: JoinRequest) => {
    if (store[socket.id]) {
      return;
    }

    store[socket.id] = { username: request.username, currentRoomId: request.roomId };
    socket.join(request.roomId);

    io.sockets.in(request.roomId).emit("message", {
      content: `${request.username} joined to this room`,
      timestamp: timestamp(),
      username: "System"
    } as MessageResponse);
  });

  socket.on("leave", (_: LeaveRequest) => {
    if (!store[socket.id]) {
      return;
    }

    const { currentRoomId, username } = store[socket.id];
    delete store[socket.id];
    socket.leave(currentRoomId);

    io.sockets.in(currentRoomId).emit("message", {
      content: `${username} leaved from this room`,
      timestamp: timestamp(),
      username: "System"
    } as MessageResponse);
  });

  socket.on("message", (message: MessageRequest) => {
    if (!store[socket.id]) {
      return;
    }

    const { currentRoomId, username } = store[socket.id];

    io.sockets.in(currentRoomId).emit("message", {
      content: message.content,
      timestamp: timestamp(),
      username
    } as MessageResponse);
  });
});

server.listen(3002, () => {
  console.log("server listening at http://localhost:3002");
});
