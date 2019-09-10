import colors from "colors.css";
import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

import App from "./App";

const GlobalStyles = createGlobalStyle`
  body {
    height: 100vh;
    margin: 0;
    color: ${colors.black};
    background-color: ${colors.white};
  }

  #app {
    height: 100%;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyles />
    <App />
  </>,
  document.querySelector("#app")
);
