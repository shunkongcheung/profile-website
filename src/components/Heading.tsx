import React, { memo } from "react";
import styled from "styled-components";

const Container = styled.h2`
  padding-top: 5rem;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary[50]};
`;

interface HeadingProps {
  children: string;
  handleRef?: (ref: HTMLElement) => any;
}

const Heading: React.FC<HeadingProps> = ({ children, handleRef }) => {
  return (
    <Container
      ref={(ref) => {
        if (!!ref && !!handleRef) handleRef(ref);
      }}
    >
      {children}
    </Container>
  );
};

export default memo(Heading);
