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
  const [socket, setSocket] = useState<SocketIOClient.Socket>(io.connect(uri, { ...opts, autoConnect: false }));
  const refs = useRef(listeners);

  useEffect(() => {
    if (socket.io.uri !== uri) setSocket(io.connect(uri, { ...opts, autoConnect: false }));
  }, [uri]);

  useEffect(() => {
    const previous = refs.current;

    const runListener = (event: string, ...args: any[]) => {
      const listener = refs.current[event];
      if (listener) listener(...args);
    };

    Object.keys(previous).forEach(event => socket.removeListener(event));
    Object.keys(listeners).forEach(event => socket.on(event, (...args: any[]) => runListener(event, ...args)));
  }, [Object.keys(listeners).join("-")]); // when listen events is changed, unsubscribe and subscribe

  useEffect(() => {
    refs.current = listeners;
  }, [listeners]);

  useEffect(() => {
    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, [socket]);

  return { socket };
};

export default useSocket;
