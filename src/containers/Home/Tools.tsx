import React, { memo } from "react";
import styled from "styled-components";
import { Lang, I18N } from "../../types";

interface ToolsProps {
  lang: Lang;
  tools: Array<Tool>;
}

interface Tool {
  id: number;
  name: string;
  icon: string;
}

const SPACE = 20;

const Container = styled.div``;

const Heading = styled.h3`
  margin-top: 3rem;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary[50]};
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;

  padding: 10px;
  background: ${(props) => props.theme.colors.primary[50]};
  border-radius: 5px;
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

  transition: transform 0.2s ease-in;
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

const Tools: React.FC<ToolsProps> = ({ tools, lang }) => {
  return (
    <Container>
      <Heading>{Trans.heading[lang]}</Heading>
      <Row>
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
