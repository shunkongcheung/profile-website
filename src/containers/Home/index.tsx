import React, { memo } from "react";
import styled from "styled-components";

import BlendImage from "./BlendImage";
import Carousel from "./Carousel";
import FlippyImage from "./FlippyImage";
import ThreeDImage from "./ThreeDImage";

import { useWindowSize } from "../../hooks";

interface HomeProps {}

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
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
  const [idx, setIdx] = React.useState(0);
  const sizes = React.useMemo(() => {
    if (!windowSize.width) return { width: 0, height: 0 };

    const ratio = 4 / 3;

    const WIDTH_PERC = 0.9;

    const byWidth = {
      width: windowSize.width * WIDTH_PERC,
      height: (windowSize.width * WIDTH_PERC) / ratio,
    };

    if (byWidth.height < windowSize.height * 0.8) return byWidth;

    const HEIGHT_PERC = 0.7;
    const byHeight = {
      height: windowSize.height * HEIGHT_PERC,
      width: windowSize.height * HEIGHT_PERC * ratio,
    };
    return byHeight;
  }, [windowSize]);

  return (
    <>
      <Container>
        <ImageContainer {...sizes}>
          <Carousel handleScroll={setIdx}>
            <ThreeDImage
              imgSrc={"/home-second-image.jpg"}
              isStart={idx === 0}
            />
            <FlippyImage imgSrc={"/home-first-image.jpg"} isStart={idx === 1} />
            <BlendImage imgSrc={"/home-third-image.jpg"} isStart={idx === 2} />
          </Carousel>
        </ImageContainer>
      </Container>
    </>
  );
};

export default memo(Home);
