import React, { memo } from "react";
import styled from "styled-components";

import { I18N, Lang } from "../../types";

import ProfileExperienceItem from "./ProfileExperienceItem";
import ProfileTag from "./ProfileTag";
import { Educations, Experiences, Tags } from "./data";
import ProfileSocial from "./ProfileSocial";

interface ProfileProps {
  lang: Lang;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
`;

const Heading = styled.h3`
  margin-top: 3rem;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary[50]};
`;

const ProfileSocialContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const TagsContainer = styled.div`
  display: flex;
  max-width: min(100%, 500px);
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

const Profile: React.FC<ProfileProps> = ({ lang }) => {
  const [tagIds, setTagIds] = React.useState(Object.keys(Tags));

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
    <Container>
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
      <ProfileSocialContainer>
        <ProfileSocial lang={lang} />
      </ProfileSocialContainer>
      {!!experiences.length && <Heading>{Titles.experience[lang]}</Heading>}
      {experiences.map((experience, idx) => (
        <ProfileExperienceItem
          key={`ProfileExperienceItem-${experience.title}-${experience.company}-${idx}`}
          descriptions={experience.descriptions}
          dateFrom={experience.dateFrom}
          dateTo={experience.dateTo}
          lang={lang}
          link={experience.link}
          handleTagClick={handleTag}
          images={experience.images}
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
          images={education.images}
          handleTagClick={handleTag}
          isPartTime={education.isPartTime}
          tags={education.tags}
          title={education.title}
          company={education.company}
          thumbnail={education.thumbnail}
          isLast={idx === educations.length - 1}
        />
      ))}
    </Container>
  );
};

export default memo(Profile);
