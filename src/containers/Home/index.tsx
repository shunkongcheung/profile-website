import React, { memo } from "react";
import styled from "styled-components";

import { Carousel } from "../../components";
import { Lang } from "../../types";

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

const Home: React.FC<HomeProps> = ({ lang }) => {
  const [state, setState] = React.useState({ idx: 0, isProfile: false });

  const PROFILE_PAGE_IDX = 1;
  const isProfilePage = state.idx === PROFILE_PAGE_IDX;

  React.useEffect(() => {
    if (!isProfilePage || state.isProfile) return;
    const clear = setTimeout(() => setState({ idx: 1, isProfile: true }), 500);
    return () => clearTimeout(clear);
  }, [isProfilePage, state.isProfile, setState, PROFILE_PAGE_IDX]);

  const handleScroll = React.useCallback(
    (idx) => {
      setState((o) => {
        if (o.idx === 0 && idx === 1) return { idx: 1, isProfile: false };
        return o;
      });
    },
    [setState]
  );

  return (
    <>
      <Container>
        <Carousel
          isVertical
          control={{ idx: state.idx }}
          handleScroll={handleScroll}
        >
          <Landing
            key={"CarouselItem-Landing"}
            lang={lang}
            handleNext={() => handleScroll(1)}
          />
          <Profile
            lang={lang}
            isRender={isProfilePage}
            key={"CarouselItem-Profile"}
          />
        </Carousel>
      </Container>
    </>
  );
};

export default memo(Home);
