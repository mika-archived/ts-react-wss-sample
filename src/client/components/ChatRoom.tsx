import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Message } from "../../type";
import useSocket from "../hooks/useSocket";
import Button from "./controls/Button";
import { HorizontalLayout, VerticalLayout } from "./controls/Layout";
import ChatInputBox from "./ChatInputBox";
import ChatMessage from "./ChatMessage";

type Props = {
  id: string;
  onLeave: () => void;
};

type State = {
  id: string;
  messages: Message[];
};

const initialState: State = {
  id: "",
  messages: []
};

const ChatRoom: React.FC<Props> = ({ id, onLeave }) => {
  const [state, setState] = useState<State>({ ...initialState, id });
  const { socket } = useSocket(`http://localhost:3002`, {
    connect: () => socket.emit("join", { room: state.id }),
    message: (message: Message) => setState({ ...state, messages: [...state.messages, message] })
  });

  useEffect(() => {
    socket.connect(); // connect once
  }, []);

  const sendMessage = (content: string): void => {
    const message = { user: "Anonymous", content, timestamp: dayjs().unix() };
    socket.send({ room: state.id, ...message });
    setState({
      ...state,
      messages: [...state.messages, { user: "You", ...message }]
    });
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
          <ChatMessage key={w.timestamp} message={w} />
        ))}
      </div>
      <HorizontalLayout>
        <div style={{ flex: 1 }}>
          <ChatInputBox onSubmit={message => sendMessage(message)} />
        </div>
        <Button onClick={() => onLeave()}>退室する</Button>
      </HorizontalLayout>
    </VerticalLayout>
  );
};

ChatRoom.propTypes = {
  id: PropTypes.string.isRequired,
  onLeave: PropTypes.func.isRequired
};

export default ChatRoom;
