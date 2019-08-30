import React from "react";
import styled from "styled-components";

import Content from "./components/Content";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Main = styled(Content)`
  flex: 1;
`;

const App: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Main />
      <Footer />
    </Layout>
  );
};

export default App;
