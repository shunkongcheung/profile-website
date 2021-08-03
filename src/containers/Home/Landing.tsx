import React, { memo } from "react";
import Image from "next/image";
import styled, { keyframes } from "styled-components";

import { Carousel } from "../../components";
import { I18N, Lang } from "../../types";

import BlendImage from "./BlendImage";
import FlippyImage from "./FlippyImage";
import ThreeDImage from "./ThreeDImage";
import { useWindowSize } from "../../hooks";

interface LandingProps {
  lang: Lang;
  handleNext: () => any;
}

const fadeIn = keyframes`
0% { opacity: 0% };
100% { opacity: 100% };
`;

const blink = keyframes`
0% { opacity: 0% };
50% { opacity: 100% };
100% { opacity: 0% };
`;

const ArrowDown = styled(Image)<{ delay: number }>`
  cursor: pointer;
  animation: ${blink} 2s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
  color: white;
`;

const LeftColumn = styled.div<{ width: number; height: number }>`
  flex: 1;
  display: none;

  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  border-radius: 1rem;
  overflow: hidden;
  @media (min-width: 600px) {
    display: block;
  }
`;

const Caption = styled.h3`
  color: white;

  opacity: 0;
  animation ${fadeIn} 0.3s linear forwards;
  animation-delay: 2s;
  margin: 0 0 0 auto;

  font-size: 1rem;
  @media (min-width: 600px) {
    font-size: 2rem;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-wrap: wrap;

  padding: 1rem;
  @media (min-width: 600px) {
    padding: 5rem;
  }
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    ${(props) => props.theme.colors.primary[500]},
    ${(props) => props.theme.colors.primary[500]},
    ${(props) => props.theme.colors.primary[600]}
  );
  position: absolute;

  z-index: -1;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;

  margin-top: auto;
  margin-bottom: auto;

  height: 25rem;
  max-height: 80%;

  flex-direction: column;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
  justify-content: space-between;
`;

const Title = styled.h1`
  text-wrap: wrap;
  letter-spacing: 3px;
  text-align: end;
  font-weight: 500;
  margin: 0 0 0 auto;

  transition: opacity;
  animation: ${fadeIn} 0.5s ease-in forwards;

  color: white;

  font-size: 3rem;
  width: 20rem;
  @media (min-width: 600px) {
    font-size: 4rem;
    width: 30rem;
  }
`;

const NextContainer = styled.div`
  display: flex;
  margin-top: auto;
  justify-content: center;
  width: 100%;
`;

const NextBtn = styled.button`
  border: 0;
  background: transparent;
  display: flex;
  flex-direction: column;
`;

const TRANS: { [x: string]: I18N } = {
  welcome: {
    en: "Nice to meet you",
    zh: "觀迎到來",
  },
  caption: {
    en: "Click the arrows",
    zh: "",
  },
};

const Landing: React.FC<LandingProps> = ({ handleNext, lang = "en" }) => {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const clear = setInterval(() => setIdx((o) => (o + 1) % 3), 5000);
    return () => clearInterval(clear);
  }, [setIdx]);

  const windowSize = useWindowSize();
  const sizes = React.useMemo(() => {
    if (!windowSize.width) return { width: 0, height: 0 };

    const ratio = 4 / 3;

    const WIDTH_PERC = 0.4;

    const byWidth = {
      width: windowSize.width * WIDTH_PERC,
      height: (windowSize.width * WIDTH_PERC) / ratio,
    };

    if (byWidth.height < windowSize.height * 0.8) return byWidth;

    const HEIGHT_PERC = 0.4;
    const byHeight = {
      height: windowSize.height * HEIGHT_PERC,
      width: windowSize.height * HEIGHT_PERC * ratio,
    };
    return byHeight;
  }, [windowSize]);

  return (
    <Container>
      <Background />
      <Content>
        <Row>
          <LeftColumn {...sizes}>
            <Carousel control={{ idx }}>
              <ThreeDImage
                imgSrc={"/home-second-image.jpg"}
                isStart={idx === 0}
              />
              <FlippyImage
                imgSrc={"/home-first-image.jpg"}
                isStart={idx === 1}
              />
              <BlendImage
                imgSrc={"/home-third-image.jpg"}
                isStart={idx === 2}
              />
            </Carousel>
          </LeftColumn>
          <RightColumn>
            <Title>{TRANS.welcome[lang]}</Title>
            <Caption>{TRANS.caption[lang]}</Caption>
          </RightColumn>
        </Row>
        <NextContainer>
          <NextBtn onClick={handleNext}>
            {Array.from({ length: 3 }).map((_, idx) => (
              <ArrowDown
                src="/arrow-down.svg"
                height={30}
                width={30}
                key={`ArrowDown-${idx}`}
                delay={idx * 0.3}
              />
            ))}
          </NextBtn>
        </NextContainer>
      </Content>
    </Container>
  );
};

export default memo(Landing);
