import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

type Listeners = {
  [event: string]: (...args: any[]) => void;
};

const useSocket = (
  uri: string,
  listeners: Listeners,
  opts?: SocketIOClient.ConnectOpts
): { socket: SocketIOClient.Socket } => {
  const [socket] = useState<SocketIOClient.Socket>(io(uri, { ...opts, autoConnect: false }));
  const refs = useRef(listeners);
  refs.current = listeners;

  useEffect(() => {
    socket.on("connect", () => console.log("connected"));
    socket.on("disconnect", () => console.log("disconnected"));

    const runListener = (event: string, ...args: any[]) => {
      const listener = refs.current[event];
      if (listener) listener(...args);
    };

    Object.keys(listeners).forEach(event => socket.on(event, (...args: any[]) => runListener(event, ...args)));

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, [uri, opts]);

  return { socket };
};

export default useSocket;
