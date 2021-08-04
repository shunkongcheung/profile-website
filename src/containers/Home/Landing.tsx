import React, { memo } from "react";
import styled from "styled-components";

import { Carousel } from "../../components";
import { useWindowSize } from "../../hooks";
import { I18N, Lang } from "../../types";

import BlendImage from "./BlendImage";
import FlippyImage from "./FlippyImage";
import ThreeDImage from "./ThreeDImage";

interface LandingProps {
  lang: Lang;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  margin-left: auto;
  margin-right: auto;

  height: 5rem;
  margin-bottom: 2rem;
`;

const CarouselContainer = styled.div`
  width: 100%;
  height: 250px;

  @media (min-width: 600px) {
    height: 500px;
  }
`;

const MyImage = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;

  background: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Name = styled.h1`
  margin: 0;
  text-align: center;
  color: ${(props) => props.theme.colors.primary[500]};

  font-size: 1.5rem;
  @media (min-width: 700px) {
    font-size: 2rem;
  }
`;

const Location = styled.h2`
  margin: 0;
  font-weight: 300;
  color: white;
`;

const TRANS: { [x: string]: I18N } = {
  name: {
    en: "Shun Kong Cheung",
    zh: "張淳罡",
  },
  location: {
    en: "Toronto, Canada",
    zh: "多倫多 加拿大",
  },
};

const Landing: React.FC<LandingProps> = ({ lang = "en" }) => {
  const [idx, setIdx] = React.useState(0);
  const { width } = useWindowSize();
  React.useEffect(() => {
    const clear = setInterval(() => setIdx((o) => (o + 1) % 3), 5000);
    return () => clearInterval(clear);
  }, [setIdx]);

  return (
    <Container>
      <Content>
        <Location>{TRANS.location[lang]}</Location>
        <Name>{TRANS.name[lang]}</Name>
      </Content>
      <CarouselContainer>
        <Carousel control={{ idx }}>
          {width > 600
            ? [
                <ThreeDImage
                  key="LandingCarouselAnimate-1"
                  imgSrc={"/home-second-image.jpg"}
                  isStart={idx === 0}
                />,
                <FlippyImage
                  key="LandingCarouselAnimate-2"
                  imgSrc={"/home-first-image.jpg"}
                  isStart={idx === 1}
                />,
                <BlendImage
                  key="LandingCarouselAnimate-3"
                  imgSrc={"/home-third-image.jpg"}
                  isStart={idx === 2}
                />,
              ]
            : [
                <MyImage
                  src="/home-second-image.jpg"
                  key="LandingCarousel-1"
                />,
                <MyImage src="/home-first-image.jpg" key="LandingCarousel-2" />,
                <MyImage src="/home-third-image.jpg" key="LandingCarousel-3" />,
              ]}
        </Carousel>
      </CarouselContainer>
    </Container>
  );
};

export default memo(Landing);
