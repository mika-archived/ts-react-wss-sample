import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "./controls/Button";
import TextBox from "./controls/TextBox";
import { HorizontalLayout } from "./controls/Layout";

type Props = {
  onSubmit: (message: string) => void;
};

type State = {
  message: string;
};

const initialState: State = {
  message: ""
};

const ChatInputBox: React.FC<Props> = props => {
  const [state, setState] = useState(initialState);
  const sendMessage = () => {
    props.onSubmit(state.message);
    setState({ message: "" });
  };

  return (
    <HorizontalLayout>
      <TextBox
        value={state.message}
        onChange={event => setState({ message: event.target.value })}
        style={{ flex: 1 }}
      />
      <Button primary disabled={!state.message} onClick={() => sendMessage()} type="submit" style={{ width: "100px" }}>
        送信
      </Button>
    </HorizontalLayout>
  );
};

ChatInputBox.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ChatInputBox;
