import React, { memo } from "react";
import styled from "styled-components";
import { useWindowSize } from "../hooks";
import Button from "./Button";

const Container = styled.div<{ isAppear: boolean }>`
  bottom: 2rem;
  margin-left: auto;
  width: 50px;
  position: sticky;
  display: flex;
  justify-content: flex-end;

  opacity: ${(props) => (props.isAppear ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const ArrowUp = styled.div`
  background: url(/arrow-up.png);
  background-size: cover;

  width: 30px;
  height: 30px;
  @media (min-width: 400px) {
    width: 40px;
    height: 40px;
  }
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
