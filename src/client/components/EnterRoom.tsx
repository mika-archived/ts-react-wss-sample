import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "./controls/Button";
import TextBox from "./controls/TextBox";

type Props = {
  onSubmit: (id: string) => void;
};

const EnterRoom: React.FC<Props> = props => {
  const [value, setValue] = useState<string>("");

  return (
    <>
      <p>ルーム ID を入力してください。</p>
      <div>
        <TextBox type="text" onChange={event => setValue(event.target.value)} />
        <Button primary type="submit" disabled={!value} onClick={() => props.onSubmit(value)}>
          入室する
        </Button>
      </div>
    </>
  );
};

EnterRoom.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default EnterRoom;
