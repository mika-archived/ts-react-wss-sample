import colors from "colors.css";
import styled from "styled-components";

const TextBox = styled.input`
  height: 1.6rem;
  padding: 2px 8px;
  border: 1px solid ${colors.silver};
  outline: 0;

  &:focus {
    border: 1px solid ${colors.blue};
  }
`;

export default TextBox;
