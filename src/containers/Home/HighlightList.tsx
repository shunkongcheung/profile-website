import React, { memo } from "react";
import styled from "styled-components";

import { Heading } from "../../components";
import { I18N, Lang } from "../../types";
import HighlightItem from "./HighlightItem";

interface HighlightListProps {
  highlights: Array<HighlightItem>;
  lang: Lang;
}

interface HighlightItem {
  id: number;
  name: I18N;
  desc: I18N;
  thumbnail: string;
  tags: Array<Tag>;
}

interface Tag {
  name: string;
  en: string;
  zh: string;
}

const SPACE = "10px";

const Container = styled.div`
  margin-top: 3rem;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: space-between;
`;

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media (min-width: 920px) {
    justify-content: inherit;
    width: inherit;
  }
`;

const Trans: { [x: string]: I18N } = {
  heading: {
    en: "Highlights",
    zh: "焦點",
  },
};

const HighlightList: React.FC<HighlightListProps> = ({ highlights, lang }) => {
  return (
    <Container>
      <Heading>{Trans.heading[lang]}</Heading>
      <Content>
        {highlights.map((highlight) => (
          <ItemContainer>
            <HighlightItem
              {...highlight}
              lang={lang}
              key={`HighlightItem-${highlight.name.en}`}
            />
          </ItemContainer>
        ))}
      </Content>
    </Container>
  );
};

export default memo(HighlightList);
