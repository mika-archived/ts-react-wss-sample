import { useEffect, useState } from "react";
import io from "socket.io-client";

const useSocket = (uri: string, opts?: SocketIOClient.ConnectOpts): { socket: SocketIOClient.Socket } => {
  const [socket] = useState<SocketIOClient.Socket>(io(uri, { ...opts, autoConnect: false }));

  useEffect(() => {
    socket.on("connect", () => console.log("connected"));
    socket.on("disconnect", () => console.log("disconnected"));

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, [uri, opts]);

  return { socket };
};

export default useSocket;
