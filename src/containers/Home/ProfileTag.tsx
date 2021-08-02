import React, { memo } from "react";
import styled from "styled-components";

interface TagProps {
  children: string;
  dehighlight?: boolean;
  onClick?: () => any;
}

const Container = styled.div<{ cursor: boolean; dehighlight: boolean }>`
  background: ${(props) => props.theme.colors.primary[50]};
  color: ${(props) =>
    props.theme.colors.primary[props.dehighlight ? 300 : 900]};
  padding: 1px 5px;
  margin: 3px;
  border: 1px solid ${(props) => props.theme.colors.primary[900]};
  border-radius: 5px;
  ${(props) => !!props.cursor && "cursor: pointer;"};
`;

const ProfileTag: React.FC<TagProps> = ({ children, dehighlight, onClick }) => {
  return (
    <Container cursor={!!onClick} onClick={onClick} dehighlight={dehighlight}>
      {children}
    </Container>
  );
};

export default memo(ProfileTag);
