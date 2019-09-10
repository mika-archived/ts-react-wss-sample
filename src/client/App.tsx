import React from "react";
import { ToastProvider } from "react-toast-notifications";
import styled from "styled-components";

import Layout from "./components/controls/Layout";
import Content from "./components/Content";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Main = styled(Content)`
  flex: 1;
`;

const App: React.FC = () => {
  return (
    <ToastProvider placement="bottom-right">
      <React.StrictMode>
        <Layout direction="vertical">
          <Header />
          <Main />
          <Footer />
        </Layout>
      </React.StrictMode>
    </ToastProvider>
  );
};

export default App;
