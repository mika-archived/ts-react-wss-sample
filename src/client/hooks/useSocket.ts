import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

type Listeners = {
  [key: string]: (...args: any[]) => void;
};

const useSocket = (uri: string, listeners: Listeners, opts?: SocketIOClient.ConnectOpts): Pick<State, "socket"> => {
  const [state] = useState<SocketIOClient.Socket>(io(uri, opts));
  const references = useRef(listeners); // used as instance variable
  references.current = listeners;

  // useEffect(() => {
  //   setState(io(uri, opts));
  // }, [uri]); // TODO: should I use lodash.deepEqual for comparing opts?

  useEffect(() => {
    state.on("connect", () => console.log("connected"));
    state.on("disconnect", () => console.log("disconnected"));

    const runCallback = (event: string, ...args: any[]): void => {
      const listener = references.current[event];
      if (listener) listener(...args);
    };

    Object.keys(listeners).forEach(event => state.on(event, (...args: any[]) => runCallback(event, ...args)));

    state.connect();

    return () => {
      state.disconnect();
      state.removeAllListeners();
    };
  }, [state]);

  return { socket: state };
};

export default useSocket;
