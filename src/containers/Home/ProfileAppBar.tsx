import React, { memo } from "react";
import styled from "styled-components";

import { I18N, Lang } from "../../types";

interface ProfileAppBarProps {
  scale: number;
  lang: Lang;
  barHeight: number;
  imgRadius: number;
}

const Border = styled.div`
  height: 1px;
  width: 80%;
  background: #777;
  margin-bottom: 0.2rem;
`;
const Container = styled.div<{ scale: number; barHeight: number }>`
  width: 100%;
  height: ${(props) => props.scale * props.barHeight}%;
  background: ${(props) => props.theme.colors.primary[500]};

  transform-origin: 0 0;
  position: fixed;
  z-index: 1;
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
  transform: translate(-33.333%) scale(${(props) => 1 / props.scale}, 1);
  bottom: 0;
  left: 0;
  position: absolute;
  background: white;
  z-index: -1;

  display: flex;
  align-items: end;
  justify-content: center;
`;

const Location = styled.h2`
  margin-left: auto;
  margin-right: auto;
  margin-top: 0rem;
  margin-bottom: 0.5rem;
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
  lang,
  scale,
}) => {
  const contentScale = Math.max(1 - 2 * scale, 0.3);
  return (
    <Container scale={Math.max(1 - scale * 1.2, 0.4)} barHeight={barHeight}>
      <Content scale={contentScale}>
        <MyImage imgRadius={imgRadius} />
        <Name>{TRANS.name[lang]}</Name>
        <Location>{TRANS.location[lang]}</Location>
        <Cover imgRadius={imgRadius} scale={contentScale}>
          <Border />
        </Cover>
      </Content>
    </Container>
  );
};

export default memo(ProfileAppBar);
