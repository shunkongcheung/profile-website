import React, { memo } from "react";
import styled from "styled-components";

import { Carousel } from "../../components";
import { useWindowSize } from "../../hooks";

import BlendImage from "./BlendImage";
import FlippyImage from "./FlippyImage";
import ThreeDImage from "./ThreeDImage";
import useImageCarousel from "./useImageCarousel";

interface ImageCarouselProps {
  isStart: boolean;
}

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

const ImageCarousel: React.FC<ImageCarouselProps> = ({ isStart }) => {
  const windowSize = useWindowSize();
  const { idx } = useImageCarousel(3, isStart);

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

  if (!isStart) return <></>;
  return (
    <>
      <Container>
        <ImageContainer {...sizes}>
          <Carousel control={{ idx }}>
            <ThreeDImage
              imgSrc={"/home-second-image.jpg"}
              isStart={isStart && idx === 0}
            />
            <FlippyImage imgSrc={"/home-first-image.jpg"} isStart={idx === 1} />
            <BlendImage imgSrc={"/home-third-image.jpg"} isStart={idx === 2} />
          </Carousel>
        </ImageContainer>
      </Container>
    </>
  );
};

export default memo(ImageCarousel);
