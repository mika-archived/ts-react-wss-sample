import React from "react";
import PropTypes from "prop-types";

import Container from "./Container";

const ChatRoom: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Container className={className}>
      <div>Foo</div>
    </Container>
  );
};

ChatRoom.propTypes = {
  className: PropTypes.string
};

ChatRoom.defaultProps = {
  className: ""
};

export default ChatRoom;
