import React, { useState } from "react";
import PropTypes from "prop-types";

import Container from "./Container";
import EnterRoom from "./EnterRoom";

type State = {
  id: string | null;
};

const initialState: State = {
  id: null
};

const ChatRoom: React.FC<{ className?: string }> = ({ className }) => {
  const [state, setState] = useState<State>(initialState);

  return (
    <Container className={className}>
      {state.id ? <></> : <EnterRoom onSubmit={value => setState({ id: value })} />}
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
