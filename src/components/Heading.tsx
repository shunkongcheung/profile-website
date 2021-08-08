import React, { memo } from "react";
import styled from "styled-components";

const Container = styled.h2`
  padding-top: 3rem;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary[50]};
`;

interface HeadingProps {
  children: string;
}

const Heading: React.FC<HeadingProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default memo(Heading);
