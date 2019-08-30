import React, { useState } from "react";
import PropTypes from "prop-types";

import ChatRoom from "./ChatRoom";
import Container from "./Container";
import EnterRoom from "./EnterRoom";

const Content: React.FC<{ className?: string }> = ({ className }) => {
  const [roomId, setRoomId] = useState<string | null>(null);

  return (
    <Container className={className}>
      {roomId ? <ChatRoom id={roomId} /> : <EnterRoom onSubmit={value => setRoomId(value)} />}
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
