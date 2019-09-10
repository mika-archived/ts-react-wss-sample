import dayjs from "dayjs";
import React from "react";
import PropTypes from "prop-types";

import { MessageResponse } from "../../type";

type Props = {
  message: MessageResponse;
};

const ChatMessage: React.FC<Props> = ({ message }) => {
  const toString = (timestamp: number): string => {
    return dayjs(timestamp * 1000).format("YYYY/MM/DD HH:mm:ss");
  };

  return (
    <p>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      {message.username} ({toString(message.timestamp)}) : {message.content}
    </p>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired
};

export default ChatMessage;
