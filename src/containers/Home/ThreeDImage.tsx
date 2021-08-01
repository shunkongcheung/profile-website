import React, { memo } from "react";
import styled, { keyframes } from "styled-components";

interface ThreeDImageProps {
  delay?: number;
  duration?: number;
  imgSrc: string;
}

interface ImgProps {
  delay?: number;
  duration: number;
  bgPos: string;
  bgSize?: number;
  imgSrc: string;
}

const main = keyframes`
  from { transform: rotateY(60deg)};
  to { transform: rotateY(30deg)};
  `;

const left = keyframes`
from {transform: rotateY(-30deg) translateX(-100%);};
to {transform: rotateY(-60deg) translateX(-100%);};
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ItemContainer = styled.div<{
  left: number;
  scale?: number;
  width?: number;
}>`
  width?: number;
  position: absolute;
  left: ${(props) => props.left}%;
  transform: translateX(-50%);
  width: ${(props) => props.width || 20}%;
  height: 100%;
  perspective: 1000px;
  ${(props) => !!props.scale && `scale: ${props.scale};`}
`;

const ImageLeft = styled.div<ImgProps>`
  position: absolute;
  left: 0;
  top: 0;

  background-image: url(${(props) => props.imgSrc});

  width: 20%;
  height: 100%;

  background-position: ${(props) => props.bgPos};
  background-size: auto ${(props) => props.bgSize || 130}%;
  transform: rotateY(-30deg) translateX(-100%);
  transform-origin: 0 50%;
  animation: ${left} ${(props) => props.duration}s forwards;
  ${(props) => !!props.delay && `animation-delay: ${props.delay}s;`}
`;

const ImageMain = styled.div<ImgProps>`
  position: absolute;
  left: 0;
  top: 0;
  background-image: url(${(props) => props.imgSrc});

  width: 100%;
  height: 100%;

  background-position: ${(props) => props.bgPos};
  background-size: auto ${(props) => props.bgSize || 130}%;
  transform: rotateY(60deg);
  transform-origin: 0 50%;
  animation: ${main} ${(props) => props.duration}s forwards;
  ${(props) => !!props.delay && `animation-delay: ${props.delay}s;`}
`;

const ThreeDImage: React.FC<ThreeDImageProps> = ({
  delay = 0.4,
  duration = 1,
  imgSrc,
}) => {
  return (
    <Container>
      <ItemContainer left={20} scale={0.8}>
        <ImageLeft
          imgSrc={imgSrc}
          bgPos="0 50%"
          delay={delay * 0}
          duration={duration}
        />
        <ImageMain
          imgSrc={imgSrc}
          bgPos="4% 50%"
          delay={delay * 0}
          duration={duration}
        />
      </ItemContainer>
      <ItemContainer left={55} width={40}>
        <ImageLeft
          imgSrc={imgSrc}
          bgSize={100}
          bgPos="24% 0"
          delay={delay}
          duration={duration}
        />
        <ImageMain
          imgSrc={imgSrc}
          bgSize={100}
          bgPos="50% 0"
          delay={delay}
          duration={duration}
        />
      </ItemContainer>

      <ItemContainer left={80} scale={0.8}>
        <ImageLeft
          imgSrc={imgSrc}
          bgPos="78% 50%"
          delay={delay * 2}
          duration={duration}
        />
        <ImageMain
          imgSrc={imgSrc}
          bgPos="96% 50%"
          delay={delay * 2}
          duration={duration}
        />
      </ItemContainer>
    </Container>
  );
};

export default memo(ThreeDImage);
