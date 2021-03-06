import React, { memo } from "react";
import Link from "next/link";
import styled from "styled-components";

import { I18N, Lang } from "../../types";
import { TagItem } from "../../components";
import { useRouter } from "next/router";
import { useDarkModeContext } from "../../hooks";

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
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
`;

const MyImage = styled.div<{ src: string; isDark: boolean }>`
  background: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  width: 300px;
  height: 400px;
  @media (min-width) {
    width: 400px;
    height: 600px;
  }

  border-radius: 10px;

  filter: saturate(${(props) => (props.isDark ? 50 : 100)}%);
  transition: filter 0.2s ease-in, transform 0.2s ease-in;

  &:hover {
    filter: saturate(${(props) => (props.isDark ? 100 : 150)}%);
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

const ItemContainer = styled.div`
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
  const { pathname } = useRouter();
  const { mode } = useDarkModeContext();
  return (
    <Container>
      <Link href={`${pathname}/highlight/${id}`} passHref>
        <a  style={{ margin: 0 }}>
          <MyImage src={thumbnail} isDark={mode === "dark"} />
        </a>
      </Link>
      <TagListContainer>
        {tags.map((tag) => (
          <ItemContainer key={`TagItem-${name.en}-${tag.en}`}>
            <TagItem>{tag[lang]}</TagItem>
          </ItemContainer>
        ))}
      </TagListContainer>
      <Name>
        <Link href={`${pathname}/highlight/${id}`} passHref>
          <a>{name[lang]}</a>
        </Link>
      </Name>
      <Desc>
        {desc[lang].slice(0, 150)}
        {desc[lang].length > 150 && "..."}
      </Desc>
    </Container>
  );
};

export default memo(HighlightItem);
