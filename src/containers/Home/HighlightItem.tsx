import React, { memo } from "react";
import Link from "next/link";
import styled from "styled-components";

import { I18N, Lang } from "../../types";
import ProfileTag from "./ProfileTag";

interface HighlightItemProps {
  id: number;
  name: I18N;
  desc: I18N;
  lang: Lang;
  thumbnail: string;
  tags: Array<Tag>;
}

interface Tag {
  name: string;
  en: string;
  zh: string;
}

const Container = styled.div`
  margin: 0 auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyImage = styled.div<{ src: string }>`
  background: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 400px;
  height: 600px;

  border-radius: 10px;
  filter: saturate(50%);
  transition: filter 0.2s ease-in, transform 0.2s ease-in;

  &:hover {
    filter: saturate(105%);
    transform: scale(1.05);
  }
`;

const TAG_SPACE = "5px";

const TagListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 30px -${TAG_SPACE} 0;
  justify-content: center;
`;

const TagItem = styled.div`
  margin-left: ${TAG_SPACE};
  margin-right: ${TAG_SPACE};
`;

const Name = styled.h3`
  margin-bottom: 0;
  font-size: 1.5rem;
`;

const Desc = styled.p`
  color: ${(props) => props.theme.colors.primary[200]};
  font-size: 1rem;
  text-align: center;
`;

const HighlightItem: React.FC<HighlightItemProps> = ({
  id,
  name,
  desc,
  lang,
  tags,
  thumbnail,
}) => {
  return (
    <Container>
      <MyImage src={thumbnail} />
      <TagListContainer>
        {tags.map((tag) => (
          <TagItem key={`TagItem-${name.en}-${tag.en}`}>
            <ProfileTag>{tag[lang]}</ProfileTag>
          </TagItem>
        ))}
      </TagListContainer>
      <Name>
        <Link href={`/highlight/${id}`}>{name[lang]}</Link>
      </Name>
      <Desc>
        {desc[lang].slice(0, 150)}
        {desc[lang].length > 150 && "..."}
      </Desc>
    </Container>
  );
};

export default memo(HighlightItem);
