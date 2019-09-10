import React from "react";
import PropTypes from "prop-types";

import Button from "./controls/Button";
import Layout from "./controls/Layout";
import ChatInputBox from "./ChatInputBox";
import ChatMessage from "./ChatMessage";
import { MessageResponse } from "../../type";

type Props = {
  roomId: string;
  messages: MessageResponse[];
  onSubmit: (message: string) => void;
  onLeave: () => void;
};

const ChatRoom: React.FC<Props> = ({ roomId, messages, onSubmit, onLeave }) => {
  return (
    <Layout direction="vertical">
      <div>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <h2>Room ID: {roomId}</h2>
        <p>Messages</p>
      </div>
      <div style={{ flex: 1 }}>
        {messages.map(w => (
          <ChatMessage key={w.timestamp} message={w} />
        ))}
      </div>
      <Layout direction="horizontal">
        <div style={{ flex: 1 }}>
          <ChatInputBox onSubmit={onSubmit} />
        </div>
        <Button role="button" onClick={onLeave}>
          Leave Room
        </Button>
      </Layout>
    </Layout>
  );
};

ChatRoom.propTypes = {
  roomId: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired
};

export default ChatRoom;
