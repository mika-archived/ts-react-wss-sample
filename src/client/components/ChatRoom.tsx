import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";


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

  return (
    <>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <h2>RoomID: {state.id}</h2>
    </>
  );
};

ChatRoom.propTypes = {
  id: PropTypes.string.isRequired
};

export default ChatRoom;
