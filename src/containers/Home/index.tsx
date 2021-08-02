import React, { memo } from "react";
import styled from "styled-components";

import { Carousel } from "../../components";
import { Lang } from "../../types";

import ImageCarousel from "./ImageCarousel";
import Landing from "./Landing";
import Profile from "./Profile";

interface HomeProps {
  lang: Lang;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 1;
`;

const ImageContainer = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

const CarouselPlaceholder = styled.div`
  width: 100vw;
  height: 100vh;
  display: relative;
  z-index: -1;
`;

const Home: React.FC<HomeProps> = ({ lang }) => {
  const [state, setState] = React.useState({ idx: 0, isProfile: false });

  React.useEffect(() => {
    if (state.idx !== 1) return;

    const IMG_COUNT = 3;
    const ANIMATION_DURATION = 4000; // per image
    const clear = setTimeout(
      () => setState({ idx: 2, isProfile: false }),
      ANIMATION_DURATION * IMG_COUNT
    );
    return () => clearTimeout(clear);
  }, [state.idx, setState]);

  React.useEffect(() => {
    if (state.idx !== 2 || state.isProfile) return;

    window.scrollTo(0, 0);
    const clear = setTimeout(() => setState({ idx: 2, isProfile: true }), 500);
    return () => clearTimeout(clear);
  }, [state.idx, state.isProfile, setState]);

  const handleScroll = React.useCallback(
    (idx) => {
      setState((o) => {
        if (o.idx === 0 && idx === 1) return { idx: 1, isProfile: false }; // scroll on first page, proceed to next page
        return o; // scrolling on other pages are not allowed
      });
    },
    [setState]
  );

  if (state.isProfile) return <Profile lang={lang} isRender />;

  return (
    <>
      <Container>
        <ImageContainer>
          <ImageCarousel isStart={state.idx >= 1} />
        </ImageContainer>
        <Carousel
          isVertical
          control={{ idx: state.idx }}
          handleScroll={handleScroll}
          scrollable={state.idx === 0}
        >
          <Landing
            lang={lang}
            handleNext={() => setState({ idx: 1, isProfile: false })}
          />
          <CarouselPlaceholder />
          <Profile lang={lang} isRender={state.idx === 2} />
        </Carousel>
      </Container>
    </>
  );
};

export default memo(Home);
