import React, { memo } from "react";
import styled from "styled-components";

import { Carousel } from "../../components";
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
  height: 500px;
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
          <ThreeDImage imgSrc={"/home-second-image.jpg"} isStart={idx === 0} />
          <FlippyImage imgSrc={"/home-first-image.jpg"} isStart={idx === 1} />
          <BlendImage imgSrc={"/home-third-image.jpg"} isStart={idx === 2} />
        </Carousel>
      </CarouselContainer>
    </Container>
  );
};

export default memo(Landing);
