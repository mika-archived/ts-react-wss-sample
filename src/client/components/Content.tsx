import React from "react";
import { useToasts } from "react-toast-notifications";
import PropTypes from "prop-types";

import Container from "./controls/Container";
import ChatRoom from "./ChatRoom";
import EnterRoom from "./EnterRoom";
import useChat from "../hooks/useChat";

const Content: React.FC<{ className?: string }> = ({ className }) => {
  const { addToast } = useToasts();
  const chat = useChat("http://localhost:3002", {
    onConnect: () => addToast("connected to the WebSocket chat server!", { appearance: "success", autoDismiss: true }),
    onDisconnect: () =>
      addToast("disconnected from the WebSocket chat server", { appearance: "error", autoDismiss: true })
  });
  const join = (id: string, username: string) => chat.join(id, username);
  const leave = () => chat.leave();
  const sendMessage = (message: string) => chat.sendMessage(message);

  return (
    <Container className={className}>
      {chat.roomId ? (
        <ChatRoom roomId={chat.roomId} messages={chat.messages} onSubmit={sendMessage} onLeave={leave} />
      ) : (
        <EnterRoom onSubmit={join} />
      )}
    </Container>
  );
};

Content.propTypes = {
  className: PropTypes.string
};

Content.defaultProps = {
  className: ""
};

export default Content;
