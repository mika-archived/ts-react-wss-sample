import { useEffect, useState } from "react";
import io from "socket.io-client";

type State = {
  socket: SocketIOClient.Socket;
};

const initialState: Omit<State, "socket"> = {};

const useSocket = (uri: string, opts?: SocketIOClient.ConnectOpts): Pick<State, "socket"> => {
  const [state] = useState<State>({ ...initialState, socket: io(uri, { ...opts, autoConnect: false }) });

  useEffect(() => {
    state.socket.on("connect", () => console.log("connected"));
    state.socket.on("disconnect", () => console.log("disconnected"));

    return () => {
      state.socket.disconnect();
      state.socket.removeAllListeners();
    };
  }, [uri, opts]);

  return { socket: state.socket };
};

export default useSocket;
