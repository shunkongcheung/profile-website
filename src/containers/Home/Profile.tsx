import React, { memo } from "react";
import styled from "styled-components";
import { Moment } from "moment";

import { I18N, Lang } from "../../types";

import ProfileExperienceItem from "./ProfileExperienceItem";
import ProfileTag from "./ProfileTag";
import ProfileSocial from "./ProfileSocial";

interface ProfileProps {
  lang: Lang;
  experiences: Array<Experience>;
  educations: Array<Experience>;
  tags: Array<Tag>;
}

interface Experience {
  id: number;
  companyName: string;
  companyUrl: string;
  title: string;
  dateFrom: Moment;
  dateTo: Moment;
  images: Array<string>;
  isPartTime: boolean;
  descriptions: Array<string>;
  tags: Array<Tag>;
}

interface Tag {
  name: string;
  en: string;
  zh: string;
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

const Profile: React.FC<ProfileProps> = ({
  lang,
  experiences,
  educations,
  tags,
}) => {
  const allTagIds = React.useMemo(() => tags.map((itm) => itm.name), [tags]);
  const [tagIds, setTagIds] = React.useState(allTagIds);

  const handleTag = React.useCallback(
    (key: string) => {
      setTagIds((tagIds) => {
        if (tagIds.length === allTagIds.length) {
          // all were selected. now only select one
          return [key];
        }

        const isExist = !!tagIds.find((itm) => itm === key);
        const newKeys = isExist
          ? tagIds.filter((itm) => itm !== key)
          : [...tagIds, key];

        // after selectign this one, none were selected, then reset
        if (newKeys.length === 0) return allTagIds;

        return newKeys;
      });
    },
    [setTagIds, allTagIds]
  );

  const filteredEducations = React.useMemo(
    () =>
      educations.filter(({ tags }) =>
        tags.reduce((acc, { name }) => acc || tagIds.includes(name), false)
      ),
    [educations, tagIds]
  );

  const filteredExperiences = React.useMemo(
    () =>
      experiences.filter(({ tags }) =>
        tags.reduce((acc, { name }) => acc || tagIds.includes(name), false)
      ),
    [experiences, tagIds]
  );

  return (
    <Container>
      <TagsContainer>
        {tags.map(({ name, ...itm }) => (
          <ProfileTag
            key={`TagItem-${name}`}
            onClick={() => handleTag(name)}
            dehighlight={!tagIds.find((tagId) => tagId === name)}
          >
            {itm[lang]}
          </ProfileTag>
        ))}
      </TagsContainer>
      <ProfileSocialContainer>
        <ProfileSocial lang={lang} />
      </ProfileSocialContainer>
      {!!filteredExperiences.length && (
        <Heading>{Titles.experience[lang]}</Heading>
      )}
      {filteredExperiences.map((experience, idx) => (
        <ProfileExperienceItem
          key={`ProfileExperienceItem-${experience.title}-${experience.companyName}-${idx}`}
          descriptions={experience.descriptions}
          dateFrom={experience.dateFrom}
          dateTo={experience.dateTo}
          lang={lang}
          link={experience.companyUrl}
          handleTagClick={handleTag}
          images={experience.images}
          isPartTime={experience.isPartTime}
          tags={experience.tags}
          title={experience.title}
          company={experience.companyName}
          isLast={idx === experiences.length - 1}
        />
      ))}
      {!!filteredEducations.length && (
        <Heading>{Titles.education[lang]}</Heading>
      )}
      {filteredEducations.map((education, idx) => (
        <ProfileExperienceItem
          key={`ProfileExperienceItem-${education.title}-${education.companyName}-${idx}`}
          descriptions={education.descriptions}
          dateFrom={education.dateFrom}
          dateTo={education.dateTo}
          lang={lang}
          link={education.companyUrl}
          images={education.images}
          handleTagClick={handleTag}
          isPartTime={education.isPartTime}
          tags={education.tags}
          title={education.title}
          company={education.companyName}
          isLast={idx === educations.length - 1}
        />
      ))}
    </Container>
  );
};

export default memo(Profile);
