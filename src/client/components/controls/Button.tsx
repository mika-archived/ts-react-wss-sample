import colors from "colors.css";
import styled from "styled-components";

type Props = {
  primary?: boolean;
};

const Button = styled.button<Props>`
  height: 1.8rem;
  padding: 0.25rem 0.6rem;
  color: ${props => (props.primary ? colors.white : colors.black)};
  background: ${props => (props.primary ? colors.blue : colors.white)};
  border: 1px solid ${props => (props.primary ? colors.blue : colors.silver)};

  &:disabled {
    color: ${colors.silver};
    background: ${colors.gray};
    border-color: ${colors.gray};
  }
`;

export default Button;
