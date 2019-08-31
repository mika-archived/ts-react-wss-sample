import dayjs from "dayjs";
import React from "react";
import PropTypes from "prop-types";

import { Message } from "../../type";

type Props = {
  message: Message;
};

const ChatMessage: React.FC<Props> = ({ message }) => {
  const toString = (timestamp: number): string => {
    return dayjs(timestamp * 1000).format("YYYY/MM/DD HH:mm:ss");
  };

  return (
    <p>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      {message.user} ({toString(message.timestamp)}) : {message.content}
    </p>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired
  }).isRequired
};

export default ChatMessage;
