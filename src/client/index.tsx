import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    color: #333;
    background-color: #f9f9f9;
  }
`;

ReactDOM.render(
  <React.StrictMode>
  </React.StrictMode>,
  document.querySelector("#app")
);
