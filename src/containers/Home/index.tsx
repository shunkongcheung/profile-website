import React, { memo } from "react";
import styled from "styled-components";

import { Lang } from "../../types";

import Landing from "./Landing";
import Profile from "./Profile";

interface HomeProps {
  lang: Lang;
}

const Container = styled.div`
  display: flex;
  background: #2d3e50;
  padding: 3rem 1rem;

  min-height: 100vh;
`;

const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1050px;
`;

const Home: React.FC<HomeProps> = ({ lang }) => {
  return (
    <Container>
      <Content>
        <Landing lang={lang} />
        <Profile lang={lang} />
      </Content>
    </Container>
  );
};

export default memo(Home);
