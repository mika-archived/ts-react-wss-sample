import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { VerticalLayout } from "./controls/Layout";
import useSocket from "../hooks/useSocket";
import ChatInputBox from "./ChatInputBox";

type Props = {
  id: string;
};

type State = {
  id: string;
  messages: string[];
};

const initialState: State = {
  id: "",
  messages: []
};

const ChatRoom: React.FC<Props> = ({ id }) => {
  const [state, setState] = useState<State>({ ...initialState, id });
  const { socket } = useSocket(`http://localhost:3002`);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join", { room: state.id });
    });

    socket.on("message", (message: any) => {
      setState({ ...state, messages: [...state.messages, message] });
    });

    socket.open();
  });

  const sendMessage = (message: string): void => {
    socket.send({ room: state.id, content: message });
    setState({ ...state, messages: [...state.messages, message] });
  };

  return (
    <VerticalLayout>
      <div>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <h2>Room ID: {state.id}</h2>
        <p>Messages</p>
      </div>
      <div style={{ flex: 1 }}>
        {state.messages.map(w => (
          /* eslint-disable-next-line react/jsx-one-expression-per-line */
          <p key={w}>Anonymous: {w}</p>
        ))}
      </div>
      <div>
        <ChatInputBox onSubmit={message => sendMessage(message)} />
      </div>
    </VerticalLayout>
  );
};

ChatRoom.propTypes = {
  id: PropTypes.string.isRequired
};

export default ChatRoom;
