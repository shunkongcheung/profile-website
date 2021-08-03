import React, { memo } from "react";
import styled from "styled-components";

import { I18N, Lang } from "../../types";

interface ProfileAppBarProps {
  scale: number;
  isRender: boolean;
  lang: Lang;
  barHeight: number;
  imgRadius: number;
}

const Border = styled.div<{ scale: number }>`
  height: 2px;
  width: 80%;
  background: #eee;
  margin-bottom: 0.2rem;

  transform: scale(1, ${(props) => 1 / props.scale});
`;
const Container = styled.div<{
  scale: number;
  barHeight: number;
  isRender: boolean;
}>`
  width: 100%;
  height: ${(props) => props.scale * props.barHeight}%;
  background: linear-gradient(
    ${(props) => props.theme.colors.primary[600]},
    ${(props) => props.theme.colors.primary[500]},
    ${(props) => props.theme.colors.primary[500]}
  );

  transform-origin: 0 0;
  opacity: 0;
  ${(props) => !!props.isRender && "position: fixed;"}
  ${(props) => !!props.isRender && "opacity: 1;"}
  transition: opacity 0.5s ease-in;
  top: 0;
`;

const Content = styled.div<{ scale: number }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: auto;
  margin-right: auto;

  transform: translate(-50%, 50%) scale(${(props) => props.scale});
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Cover = styled.div<{ imgRadius: number; scale: number }>`
  width: 100vw;
  height: ${(props) => props.imgRadius + 2.8}rem;
  bottom: 0;
  left: 0;
  position: absolute;
  background: white;
  z-index: -1;

  display: flex;
  align-items: end;
  justify-content: center;

  transform: translateY(100%) scale(1, ${(props) => props.scale});
  transform-origin: top;
`;

const Location = styled.h2`
  margin-left: auto;
  margin-right: auto;
  margin-top: 0rem;
  padding-bottom: 1rem;
  font-weight: 300;
`;

const MyImage = styled.div<{ imgRadius: number }>`
  width: ${(props) => props.imgRadius * 2}rem;
  height: ${(props) => props.imgRadius * 2}rem;
  border-radius: 50%;
  background: url(/home-profile.jpg);
  background-size: cover;
  transition: transform 0.1s linear;

  &:hover {
    transform: scale(1.05);
  }
`;

const Name = styled.h1`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0.2rem;
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

const ProfileAppBar: React.FC<ProfileAppBarProps> = ({
  barHeight,
  imgRadius,
  isRender,
  lang,
  scale,
}) => {
  const contentScale = Math.max(1 - 2 * scale, 0.3);
  return (
    <Container
      scale={Math.max(1 - scale * 1.2, 0.4)}
      barHeight={barHeight}
      isRender={isRender}
    >
      <Content scale={contentScale}>
        <MyImage imgRadius={imgRadius} />
        <Name>{TRANS.name[lang]}</Name>
        <Location>{TRANS.location[lang]}</Location>
      </Content>
      <Cover imgRadius={imgRadius} scale={contentScale}>
        <Border scale={contentScale} />
      </Cover>
    </Container>
  );
};

export default memo(ProfileAppBar);
