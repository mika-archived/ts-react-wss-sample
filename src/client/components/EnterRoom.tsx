import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "./controls/Button";
import TextBox from "./controls/TextBox";

type Props = {
  onSubmit: (id: string, username: string) => void;
};

const EnterRoom: React.FC<Props> = props => {
  const [roomId, setRoomId] = useState<string>("");
  const [username, setUsername] = useState<string>("Anonymous");

  return (
    <>
      <p>Please enter Username and Room ID : </p>
      <div>
        <TextBox
          type="text"
          role="textbox"
          placeholder="Username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <TextBox
          type="text"
          role="textbox"
          placeholder="Room ID"
          value={roomId}
          onChange={event => setRoomId(event.target.value)}
        />
        <Button
          primary
          type="submit"
          role="button"
          disabled={!roomId || !username}
          onClick={() => props.onSubmit(roomId, username)}
        >
          Join Room
        </Button>
      </div>
    </>
  );
};

EnterRoom.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default EnterRoom;
