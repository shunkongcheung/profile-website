import React, { memo } from "react";
import Image from "next/image";
import styled, { keyframes } from "styled-components";

import { Carousel } from "../../components";
import { I18N, Lang } from "../../types";

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

const CarouselContainer = styled.div`
  width: 100%;
  @media (min-width: 600px) {
    width: 60%;
  }
`;

const Caption = styled.h3`
  color: white;
  margin: auto 0 auto auto;

  opacity: 0;
  animation ${fadeIn} 0.3s linear forwards;
  animation-delay: 2s;

  font-size: 1rem;
  @media (min-width: 600px) {
    font-size: 2rem;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;

  display: flex;
  flex-wrap: wrap;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  padding: 2rem;

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
  // background: url("/home-landing.jpg");
  position: absolute;

  z-index: -1;
`;

const Title = styled.h1`
  text-wrap: wrap;
  letter-spacing: 3px;
  text-align: end;
  font-weight: 500;

  transition: opacity;
  animation: ${fadeIn} 0.5s ease-in forwards;

  margin: auto 0 auto auto;

  // color: ${(props) => props.theme.colors.primary[800]};
  color: white;

  font-size: 3rem;
  width: 20rem;
  @media (min-width: 600px) {
    font-size: 4rem;
    width: 30rem;
  }
`;

const NextContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
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
    en: "Scroll down or click the arrows",
    zh: "",
  },
};

const Landing: React.FC<LandingProps> = ({ handleNext, lang = "en" }) => {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const clear = setInterval(() => setIdx((o) => (o + 1) % 2), 5000);
    return () => clearInterval(clear);
  }, [setIdx]);

  return (
    <Container>
      <Background />
      <Content>
        <CarouselContainer>
          <Carousel control={{ idx }}>
            <div>hello</div>
            <div>hey</div>
          </Carousel>
        </CarouselContainer>
        <Title>{TRANS.welcome[lang]}</Title>
        <Caption>{TRANS.caption[lang]}</Caption>
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
