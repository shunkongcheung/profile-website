import React, { memo } from "react";
import styled, { css, keyframes } from "styled-components";
import { useInViewport } from "../../hooks";
import { Lang, I18N } from "../../types";

interface ToolsProps {
  lang: Lang;
  handleRef: (ref?: HTMLElement) => any;
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

const Heading = styled.h3<{ isVisible: boolean }>`
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
  background: ${(props) => props.theme.colors.primary[50]};
  border-radius: 5px;

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
  font-size: 0.6rem;
  color: ${(props) => props.theme.colors.primary[900]};
  text-align: center;
`;

const Trans: { [x: string]: I18N } = {
  heading: {
    en: "Tech & Tools",
    zh: "技術和工具",
  },
};

const Tools: React.FC<ToolsProps> = ({ tools, lang, handleRef }) => {
  const { isVisible, handleRef: handleVRef } = useInViewport("-50%");
  return (
    <Container
      ref={(ref) => {
        handleVRef(ref);
        handleRef(ref);
      }}
    >
      <Heading isVisible={isVisible}>{Trans.heading[lang]}</Heading>
      <Row isVisible={isVisible}>
        {tools.map((tool) => (
          <Item key={`ToolItem-${tool.name}`}>
            <Icon src={tool.icon} />
            <Name>{tool.name}</Name>
          </Item>
        ))}
      </Row>
    </Container>
  );
};

export default memo(Tools);
