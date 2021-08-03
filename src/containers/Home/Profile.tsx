import React, { ChangeEvent, memo } from "react";
import styled from "styled-components";

import { useWindowSize } from "../../hooks";
import { I18N, Lang } from "../../types";

import ProfileAppBar from "./ProfileAppBar";
import ProfileExperienceItem from "./ProfileExperienceItem";
import ProfileTag from "./ProfileTag";
import { Educations, Experiences, Tags } from "./data";
import ProfileSocial from "./ProfileSocial";

interface ProfileProps {
  isRender: boolean;
  lang: Lang;
}

const BAR_HEIGHT = 35;
const IMG_RADIUS = 10;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: white;
  overflow: scroll;
  position: relative;
`;

const ContentContainer = styled.div`
  display: flex;
  margin-top: calc(${IMG_RADIUS + 7}rem);
  width: 100%;
`;

const Content = styled.div`
  width: 1080px;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h3`
  margin-top: 3rem;
  font-size: 2rem;
`;

const TagsContainer = styled.div`
  display: flex;
  max-width: 100%;
  width: 500px;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
`;

const Titles: { [x: string]: I18N } = {
  experience: {
    en: "Experiences",
    zh: "經驗",
  },
  education: {
    en: "Education",
    zh: "學歷",
  },
};

const Profile: React.FC<ProfileProps> = ({ isRender, lang }) => {
  const [scale, setScale] = React.useState(0);
  const { height: windowHeight } = useWindowSize();

  const [tagIds, setTagIds] = React.useState(Object.keys(Tags));

  const handleScroll = React.useCallback(
    ({ target }: ChangeEvent<HTMLDivElement>) => {
      const portion = target.scrollTop / (windowHeight || 1);
      const scale = Math.min(portion, 0.5);
      setScale(scale);
    },
    [setScale, windowHeight]
  );

  const handleTag = React.useCallback(
    (key: string) => {
      setTagIds((tags) => {
        if (tags.length === Object.keys(Tags).length) {
          // all were selected. now only select one
          return [key];
        }

        const isExist = !!tags.find((itm) => itm === key);
        const newKeys = isExist
          ? tags.filter((itm) => itm !== key)
          : [...tags, key];

        // after selectign this one, none were selected, then reset
        if (newKeys.length === 0) return Object.keys(Tags);

        return newKeys;
      });
    },
    [setTagIds]
  );

  const educations = React.useMemo(
    () =>
      Educations.filter(({ tags }) =>
        tags.reduce((acc, { id }) => acc || tagIds.includes(id), false)
      ),
    [tagIds]
  );

  const experiences = React.useMemo(
    () =>
      Experiences.filter(({ tags }) =>
        tags.reduce((acc, { id }) => acc || tagIds.includes(id), false)
      ),
    [tagIds]
  );

  return (
    <Container onScroll={handleScroll as any}>
      <ProfileAppBar
        isRender={isRender}
        lang={lang}
        barHeight={BAR_HEIGHT}
        imgRadius={IMG_RADIUS}
        scale={scale}
      />
      <ContentContainer>
        <Content>
          <TagsContainer>
            {Object.entries(Tags).map(([key, itm]) => (
              <ProfileTag
                key={`TagItem-${key}`}
                onClick={() => handleTag(key)}
                dehighlight={!tagIds.find((tagId) => tagId === key)}
              >
                {itm[lang]}
              </ProfileTag>
            ))}
          </TagsContainer>
          <ProfileSocial lang={lang} />
          {!!experiences.length && <Heading>{Titles.experience[lang]}</Heading>}
          {experiences.map((experience, idx) => (
            <ProfileExperienceItem
              key={`ProfileExperienceItem-${experience.title}-${experience.company}-${idx}`}
              descriptions={experience.descriptions}
              dateFrom={experience.dateFrom}
              dateTo={experience.dateTo}
              lang={lang}
              link={experience.link}
              isPartTime={experience.isPartTime}
              tags={experience.tags}
              title={experience.title}
              company={experience.company}
              thumbnail={experience.thumbnail}
              isLast={idx === experiences.length - 1}
            />
          ))}
          {!!educations.length && <Heading>{Titles.education[lang]}</Heading>}
          {educations.map((education, idx) => (
            <ProfileExperienceItem
              key={`ProfileExperienceItem-${education.title}-${education.company}-${idx}`}
              descriptions={education.descriptions}
              dateFrom={education.dateFrom}
              dateTo={education.dateTo}
              lang={lang}
              link={education.link}
              isPartTime={education.isPartTime}
              tags={education.tags}
              title={education.title}
              company={education.company}
              thumbnail={education.thumbnail}
              isLast={idx === educations.length - 1}
            />
          ))}
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default memo(Profile);
