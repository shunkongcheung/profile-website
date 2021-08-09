import React, { memo } from "react";
import styled from "styled-components";

import { Lang } from "../../types";
import { TagItem } from "../../components";

interface TagListProps {
  lang: Lang;
  tagIds: Array<string>;
  tags: Array<Tag>;
  handleTag: (tagName: string) => any;
}

interface Tag {
  name: string;
  en: string;
  zh: string;
}

const Container = styled.div`
  display: flex;
  max-width: min(100%, 500px);
  flex-wrap: wrap;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

const TagList: React.FC<TagListProps> = ({ lang, tagIds, handleTag, tags }) => {
  return (
    <Container>
      {tags.map(({ name, ...itm }) => (
        <TagItem
          key={`TagItem-${name}`}
          onClick={() => handleTag(name)}
          dehighlight={!tagIds.find((tagId) => tagId === name)}
        >
          {itm[lang]}
        </TagItem>
      ))}
    </Container>
  );
};

export default memo(TagList);
