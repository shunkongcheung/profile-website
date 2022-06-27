import React, { memo, ReactNode } from "react";
import styled from "styled-components";

interface ButtonProps {
  children: ReactNode;
  onClick: () => any;
}


const Container = styled.button`
  cursor: pointer;
  background: ${(props) => props.theme.colors.primary[400]};
  border: 1px solid ${(props) => props.theme.colors.primary[900]};
  border-radius: 5px;

  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: 
  color: white;

  &:hover{
    transform: scale(1.2);
    box-shadow: 0 2px 8px 0 ${(props) => props.theme.colors.primary[400]};
  }
`;

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <Container onClick={onClick}>
    {children}
  </Container>
}

export default memo(Button);
