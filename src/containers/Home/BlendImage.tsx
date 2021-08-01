import React, { memo } from "react";
import styled, { keyframes } from "styled-components";

interface BlendImageProps {
  delayi?: number;
  duration?: number;
  isStart: boolean;
  imgSrc: string;
}

interface CoverProps {
  duration: number;
}

const blender = keyframes`
0% { transform: translateX(0%) scale(100%, 100%)};
5% { transform: translateX(-150%) scale(100%, 100%)};
10% { transform: translateX(-150%) scale(0, 100%)};
100% { transform: translateX(-150%) scale(0, 100%)};
`;

const lcover = keyframes`
0% { transform: scaleX(0%) };
5% { transform: scaleX(80%)};
100% { transform: scaleX(100%)};
`;

const rcover = keyframes`
0% { transform: scaleX(0%) };
5% { transform: scaleX(60%) };
100% { transform: scaleX(55%)};
`;

const image = keyframes`
5% { transform: translateX(0%)};
100% { transform: translateX(-4%)};
`;

const COLOR = "#444";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${COLOR};
  position: relative;
  overflow: hidden;
  border-radius: 5px;
`;

const MyImage = styled.div<{ imgSrc: string } & CoverProps>`
  height: 100%;
  width: 100%;
  background: url(${(props) => props.imgSrc});
  background-size: contain;
  background-repeat: no-repeat;

  animation: ${image} ${(props) => props.duration}s ease-in forwards;
`;

const LeftCover = styled.div<CoverProps>`
  position: absolute;
  background: ${COLOR};
  left: 0;
  height: 100%;
  width: 5%;
  top: 0;

  transform-origin: 0 0;
  animation: ${lcover} ${(props) => props.duration}s ease-in forwards;
}
`;

const RightCover = styled.div<CoverProps>`
  position: absolute;
  background: ${COLOR};
  right: 0;
  height: 100%;
  width: 100%;
  top: 0;

  transform-origin: 100% 0;
  animation: ${rcover} ${(props) => props.duration}s ease-in forwards;
}
`;

const RightBlender = styled.div<CoverProps>`
  position: absolute;
  background: white;
  right: 0;
  height: 100%;
  width: 40%;
  top: 0;

  transform-origin: 100% 0;
  mix-blend-mode: difference;
  animation: ${blender} ${(props) => props.duration}s linear forwards;
`;

const BlendImage: React.FC<BlendImageProps> = ({
  duration = 4,
  isStart,
  imgSrc,
}) => {
  if (!isStart) return <></>;
  return (
    <Container>
      <MyImage imgSrc={imgSrc} duration={duration} />
      <LeftCover duration={duration} />
      <RightCover duration={duration} />
      <RightBlender duration={duration} />
    </Container>
  );
};

export default memo(BlendImage);
