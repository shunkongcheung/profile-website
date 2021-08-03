import React, { memo } from "react";
import styled from "styled-components";

import { Carousel } from "../../components";
import { useWindowSize } from "../../hooks";
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
  const { width: screenWidth } = useWindowSize();

  const isSmallScreen = screenWidth <= 400;
  const PROFILE_PAGE_IDX = isSmallScreen ? 1 : 2;
  const isProfilePage = state.idx === PROFILE_PAGE_IDX;

  React.useEffect(() => {
    // the following code only execute when page 1 is the carousel
    if (isSmallScreen || state.idx !== 1) return;

    // on carousel, after all carousel is shown, proceed to profile page
    const IMG_COUNT = 3;
    const ANIMATION_DURATION = 4000; // per image
    const clear = setTimeout(
      () => setState({ idx: 2, isProfile: false }),
      ANIMATION_DURATION * IMG_COUNT
    );
    return () => clearTimeout(clear);
  }, [isSmallScreen, state.idx, setState]);

  React.useEffect(() => {
    if (!isProfilePage || state.isProfile) return;
    const clear = setTimeout(
      () => setState({ idx: PROFILE_PAGE_IDX, isProfile: true }),
      500
    );
    return () => clearTimeout(clear);
  }, [isProfilePage, state.isProfile, setState, PROFILE_PAGE_IDX]);

  const handleScroll = React.useCallback(
    (idx) => {
      setState((o) => {
        // in small screen, skip carousel page
        if (o.idx === 0 && idx === 1) return { idx: 1, isProfile: false };
        // scrolling on other pages are not allowed
        return o;
      });
    },
    [setState]
  );

  const children = React.useMemo(() => {
    // only push carousel placeholder if not small screen
    const ret = [
      <Landing
        key={"CarouselItem-Landing"}
        lang={lang}
        handleNext={() => handleScroll(1)}
      />,
    ];

    if (!isSmallScreen)
      ret.push(<CarouselPlaceholder key={"CarouselItem-Placeholder"} />);

    ret.push(
      <Profile
        lang={lang}
        isRender={isProfilePage}
        key={"CarouselItem-Profile"}
      />
    );
    return ret;
  }, [lang, isProfilePage, isSmallScreen, handleScroll]);

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
          {children}
        </Carousel>
      </Container>
    </>
  );
};

export default memo(Home);
