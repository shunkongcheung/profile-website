import React, { memo } from "react";
import styled from "styled-components";
import { Moment } from "moment";

import { Lang } from "../../types";

import ExperienceItem from "./ExperienceItem";
import { Heading } from "../../components";

interface ProfileProps {
  data: Array<Experience>;
  handleTag: (tag: string) => any;
  lang: Lang;
  tagIds: Array<string>;
  title: string;
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

const Profile: React.FC<ProfileProps> = ({
  lang,
  data,
  handleTag,
  tagIds,
  title,
}) => {
  const filteredData = React.useMemo(
    () =>
      data.filter(({ tags }) =>
        tags.reduce((acc, { name }) => acc || tagIds.includes(name), false)
      ),
    [data, tagIds]
  );
  if (!filteredData.length) return <></>;

  return (
    <Container>
      <Heading>{title}</Heading>
      {filteredData.map((item, idx) => (
        <ExperienceItem
          key={`ProfileExperienceItem-${item.title}-${item.companyName}-${idx}`}
          descriptions={item.descriptions}
          dateFrom={item.dateFrom}
          dateTo={item.dateTo}
          lang={lang}
          link={item.companyUrl}
          images={item.images}
          handleTagClick={handleTag}
          isPartTime={item.isPartTime}
          tags={item.tags}
          title={item.title}
          company={item.companyName}
          isLast={idx === filteredData.length - 1}
        />
      ))}
    </Container>
  );
};

export default memo(Profile);
