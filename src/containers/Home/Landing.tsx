import React, { memo } from "react";
import Image from "next/image";
import styled, { keyframes } from "styled-components";

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
  animation: ${blink} 2s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
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
  flex-direction: column;
  padding: 2rem;

  @media (min-width: 600px) {
    padding: 5rem;
  }
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: url("/home-landing.jpg");
  background-size: cover;
  background-position: 100% 50%;
  position: absolute;

  z-index: -1;
`;

const Filter = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: radial-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  opacity: 0.7;
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
};

const Landing: React.FC<LandingProps> = ({ handleNext, lang = "en" }) => {
  return (
    <Container>
      <Background>
        <Filter />
      </Background>
      <Content>
        <Title>{TRANS.welcome[lang]}</Title>
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
