import React, { memo } from "react";
import styled from "styled-components";
import { useWindowSize } from "../hooks";

const Container = styled.div<{ isAppear: boolean }>`
  bottom: 2rem;
  position: sticky;
  display: flex;
  justify-content: flex-end;

  opacity: ${(props) => (props.isAppear ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Button = styled.button`
  cursor: pointer;
  background: ${(props) => props.theme.colors.primary[400]};
  border: 1px solid ${(props) => props.theme.colors.primary[900]};
  border-radius: 5px;

  width: 50px;
  height: 50px;

  background: 
  color: white;

  &:hover{
    transform: scale(1.2);
    box-shadow: 0 2px 8px 0 ${(props) => props.theme.colors.primary[400]};
  }
`;

const ArrowUp = styled.div`
  background: url(/arrow-up.png);
  background-size: cover;
  width: 40px;
  height: 40px;
`;

const BackToTop: React.FC = () => {
  const [isAppear, setIsAppear] = React.useState(false);

  const { height } = useWindowSize();

  const handleClick = React.useCallback(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsAppear(window.pageYOffset > height);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [height, setIsAppear]);
  return (
    <Container isAppear={isAppear}>
      <Button onClick={handleClick}>
        <ArrowUp />
      </Button>
    </Container>
  );
};

export default memo(BackToTop);
