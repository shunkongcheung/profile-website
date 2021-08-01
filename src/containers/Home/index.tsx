import React, { memo } from "react";
import styled from "styled-components";

import FlippyImage from "./FlippyImage";
import ThreeDImage from "./ThreeDImage";

import { useWindowSize } from "../../hooks";

interface HomeProps {}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

const Home: React.FC<HomeProps> = () => {
  const windowSize = useWindowSize();
  const sizes = React.useMemo(() => {
    if (!windowSize.width) return { width: 0, height: 0 };

    const ratio = 4 / 3;

    const byWidth = {
      width: windowSize.width * 0.7,
      height: (windowSize.width * 0.7) / ratio,
    };
    if (byWidth.height < windowSize.height) return byWidth;

    const byHeight = {
      height: windowSize.height * 0.7,
      width: windowSize.height * 0.7 * ratio,
    };
    return byHeight;
  }, [windowSize]);
  return (
    <>
      <Container>
        <ImageContainer {...sizes}>
          <ThreeDImage imgSrc={"/home-second-image.jpg"} />
        </ImageContainer>
      </Container>
      <Container>
        <ImageContainer {...sizes}>
          <FlippyImage imgSrc={"/home-first-image.jpg"} />
        </ImageContainer>
      </Container>
    </>
  );
};

export default memo(Home);
