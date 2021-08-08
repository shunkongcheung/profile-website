import React, { memo } from "react";
import styled from "styled-components";
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

  @media (min-width: 600px) {
    margin-left: -${SPACE};
    margin-right: -${SPACE};
  }
`;

const HighlightList: React.FC<HighlightListProps> = ({ highlights, lang }) => {
  return (
    <Container>
      <Content>
        {highlights.map((highlight) => (
          <HighlightItem
            {...highlight}
            lang={lang}
            key={`HighlightItem-${highlight.name.en}`}
          />
        ))}
      </Content>
    </Container>
  );
};

export default memo(HighlightList);
