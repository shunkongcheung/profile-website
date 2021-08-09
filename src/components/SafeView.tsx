import React, { memo, ReactNode } from "react";
import styled from "styled-components";

interface SaveViewProps {
  children: ReactNode;
}

const Container = styled.div`
  display: flex;

  padding: 1rem 1.5rem;
  @media (min-width: 600px) {
    padding: 1rem 3rem;
  }
`;

const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1050px;
`;

const SaveView: React.FC<SaveViewProps> = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

export default memo(SaveView);
