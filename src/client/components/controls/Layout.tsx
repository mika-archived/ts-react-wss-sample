import styled, { css } from "styled-components";

type Props = {
  direction: "horizontal" | "vertical";
};

const Layout = styled.div<Props>`
  display: flex;
  flex-direction: ${props => (props.direction === "vertical" ? "column" : "row")};
  ${props =>
    props.direction === "vertical"
      ? css`
          height: 100%;
        `
      : ``}
`;

export default Layout;
