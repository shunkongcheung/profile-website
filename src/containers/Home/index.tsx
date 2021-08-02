import React, { memo } from "react";
import styled from "styled-components";

import { Carousel } from "../../components";
import { Lang } from "../../types";

import ImageCarousel from "./ImageCarousel";
import Landing from "./Landing";

interface HomeProps {
  lang: Lang;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ImageContainer = styled.div`
  position: absolute;
  z-index: -1;
`;

const CarouselPlaceholder = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Home: React.FC<HomeProps> = ({ lang }) => {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (idx !== 1) return;
    const IMG_COUNT = 3;
    const ANIMATION_DURATION = 4000; // per image
    const clear = setTimeout(() => setIdx(2), ANIMATION_DURATION * IMG_COUNT);
    return () => clearTimeout(clear);
  }, [idx]);

  return (
    <>
      <ImageContainer>
        <ImageCarousel isStart={idx >= 1} />
      </ImageContainer>
      <Container>
        <Carousel isVertical control={{ idx }}>
          <Landing lang={lang} handleNext={() => setIdx(1)} />
          <CarouselPlaceholder />
          <Landing lang={lang} />
        </Carousel>
      </Container>
    </>
  );
};

export default memo(Home);
