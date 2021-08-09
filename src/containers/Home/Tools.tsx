import React, { memo } from "react";
import styled, { css, keyframes } from "styled-components";

import { Heading } from "../../components";
import { useInViewport } from "../../hooks";
import { Lang, I18N } from "../../types";

interface ToolsProps {
  lang: Lang;
  handleNav: (ret: { ref: HTMLElement; name: string }) => any;
  tools: Array<Tool>;
}

interface Tool {
  id: number;
  name: string;
  icon: string;
}

const SPACE = 20;

const Container = styled.div``;

const bounceIn = keyframes`
0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 
40% {transform: translateY(-30px);} 
60% {transform: translateY(-15px);} 
`;

const fadeIn = keyframes`
0% { opacity: 0;}
100% { opacity: 1;}
`;

const animate = css`
  animation: ${bounceIn} 0.5s linear forwards, ${fadeIn} 0.5s linear forwards;
`;

const MyHeading = styled(Heading)<{ isVisible: boolean }>`
  margin-top: 3rem;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary[50]};

  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  ${(props) => !!props.isVisible && animate};
`;

const Row = styled.div<{ isVisible: boolean }>`
  display: flex;
  flex-wrap: wrap;

  padding: 10px;
  border-radius: 5px;
  margin: 0 -${SPACE}px;

  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  ${(props) => !!props.isVisible && animate};
`;

const Icon = styled.div<{ src: string }>`
  width: 100%;
  padding-top: 100%;
  background: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
`;

const IconBg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
  border-radius: 10px;
  background: white;
`;

const Item = styled.div`
  margin: 10px ${SPACE}px;

  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }

  width: calc(${100 / 3}% - ${2 * SPACE}px);

  @media (min-width: 500px) {
    width: calc(${100 / 5}% - ${2 * SPACE}px);
  }
  @media (min-width: 700px) {
    width: calc(${100 / 7}% - ${2 * SPACE}px);
  }
  @media (min-width: 1050px) {
    width: calc(${100 / 10}% - ${2 * SPACE}px);
  }
`;

const Name = styled.div`
  margin-top: 1rem;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.primary[200]};
  text-align: center;
`;

const Trans: { [x: string]: I18N } = {
  heading: {
    en: "Tech & Tools",
    zh: "技術和工具",
  },
};

const Tools: React.FC<ToolsProps> = ({ tools, lang, handleNav }) => {
  const { isVisible, handleRef: handleRef } = useInViewport("-50%");
  return (
    <Container
      ref={(ref) => {
        if (!ref) return;
        handleRef(ref);
        handleNav({ ref, name: Trans.heading[lang] });
      }}
    >
      <MyHeading isVisible={isVisible}>{Trans.heading[lang]}</MyHeading>
      <Row isVisible={isVisible}>
        {tools.map((tool) => (
          <Item key={`ToolItem-${tool.name}`}>
            <Icon src={tool.icon}>
              <IconBg />
            </Icon>
            <Name>{tool.name}</Name>
          </Item>
        ))}
      </Row>
    </Container>
  );
};

export default memo(Tools);
