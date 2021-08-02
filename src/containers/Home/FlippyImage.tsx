import React, { memo } from "react";
import styled, { keyframes } from "styled-components";

interface BlenderCardProps {
  delay: number;
  duration: number;
  gridColumn?: string;
}

interface FlippyImageProps {
  delay?: number;
  duration?: number;
  isStart: boolean;
  imgSrc: string;
}

const flip = keyframes`
from {
  transform: rotateY(0deg);
}
to {
  transform: rotateY(180deg);
}
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  overflow: hidden;
  border-radius: 5px;
`;

const MyImage = styled.div<{ imgSrc: string }>`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.imgSrc});
  background-size: cover;
`;

const BlenderContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  background: white;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  mix-blend-mode: lighten;
`;

const BlenderCard = styled.div<BlenderCardProps>`
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: transparent;

  ${(props) => (!!props.gridColumn ? `grid-column: ${props.gridColumn};` : "")}

  animation: ${flip} ${(props) => props.duration}s forwards ease-in ${(props) =>
    props.delay}s;
`;

const BlenderFront = styled.div`
  background-color: #aaa;
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;

const BlenderBack = styled.div`
  background-color: black;
  transform: rotateY(180deg);
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;

const FlippyImage: React.FC<FlippyImageProps> = ({
  delay = 0.3,
  duration = 1,
  isStart,
  imgSrc,
}) => {
  if (!isStart) return <></>;
  return (
    <Container>
      <MyImage imgSrc={imgSrc} />
      <BlenderContainer>
        {Array.from({ length: 5 }).map((_, idx) => (
          <BlenderCard
            key={`BlenderCard-${idx}`}
            duration={duration}
            delay={idx * delay}
            gridColumn={idx === 1 ? "2 / 4" : undefined}
          >
            <BlenderFront />
            <BlenderBack />
          </BlenderCard>
        ))}
      </BlenderContainer>
    </Container>
  );
};

export default memo(FlippyImage);
