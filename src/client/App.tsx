import React from "react";
import styled from "styled-components";

import ChatRoom from "./components/ChatRoom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled(ChatRoom)`
  flex: 1;
`;

const App: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Content />
      <Footer />
    </Layout>
  );
};

export default App;
