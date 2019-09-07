import React from "react";
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
    <Layout direction="vertical">
      <Header />
      <Main />
      <Footer />
    </Layout>
  );
};

export default App;
