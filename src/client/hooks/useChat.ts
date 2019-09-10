import { useEffect, useState } from "react";

import useSocket from "./useSocket";
import { MessageRequest, MessageResponse, JoinRequest, LeaveRequest } from "../../type";

type Callback = () => void;

type Callbacks = {
  onConnect?: Callback;
  onDisconnect?: Callback;
};

type ChatOperators = {
  // property
  messages: MessageResponse[];
  roomId: string | null;

  // methods
  join: (id: string, username: string) => void;
  leave: () => void;
  sendMessage: (message: string) => void;
};

const useChat = (uri: string, callbacks?: Callbacks): ChatOperators => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const { socket } = useSocket(uri, {
    connect: () => callbacks && callbacks.onConnect && callbacks.onConnect(),
    message: (message: MessageResponse) => setMessages([...messages, message]),
    disconnect: () => callbacks && callbacks.onDisconnect && callbacks.onDisconnect()
  });

  useEffect(() => {
    socket.connect();
  }, [uri]);

  const join = (id: string, username: string) => {
    if (!roomId) {
      socket.emit("join", { roomId: id, username } as JoinRequest);
      setRoomId(id);
      setMessages([]);
    } else {
      console.error("you are already joined to the room");
    }
  };
  const leave = () => {
    if (roomId) {
      socket.emit("leave", {} as LeaveRequest);
      setRoomId(null);
      setMessages([]);
    } else {
      console.error("you must join to the room at the first");
    }
  };
  const sendMessage = (message: string) => {
    if (roomId) {
      socket.send({ content: message } as MessageRequest);
    } else {
      console.error("you must join to the room at the first");
    }
  };

  return { messages, roomId, join, leave, sendMessage };
};

export default useChat;
