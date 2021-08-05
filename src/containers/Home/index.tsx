import React, { memo } from "react";
import moment from "moment";
import styled from "styled-components";

import { Lang } from "../../types";

import Landing from "./Landing";
import Profile from "./Profile";

interface HomeProps {
  lang: Lang;
  jobs: Array<Job>;
}

interface Job {
  id: number;
  images: Array<string>;
  companyName: string;
  companyUrl: string;
  title: string;
  dateFrom: string;
  dateTo: string;
  isEducation: boolean;
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
  display: flex;
  background: #2d3e50;
  padding: 3rem 1rem;

  min-height: 100vh;
`;

const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1050px;
`;

const Home: React.FC<HomeProps> = ({ lang, jobs }) => {
  const allExps = React.useMemo(
    () =>
      jobs.map((itm) => ({
        id: itm.id,
        images: itm.images.map(
          (itm) =>
            `https://home-backend.shunkongcheung.com/static/resume-images/${itm}`
        ),
        companyName: itm.companyName,
        companyUrl: itm.companyUrl,
        title: itm.title,
        dateFrom: moment(itm.dateFrom),
        dateTo: !!itm.dateTo ? moment(itm.dateTo) : moment(),
        isEducation: itm.isEducation,
        isPartTime: itm.isPartTime,
        descriptions: itm.descriptions,
        tags: itm.tags,
      })),
    [jobs]
  );

  const experiences = allExps.filter((itm) => !itm.isEducation);
  const educations = allExps.filter((itm) => !!itm.isEducation);

  const tags = jobs.reduce((acc, itm) => {
    itm.tags.map((tag) => {
      const exist = acc.find((aItem) => aItem.name === tag.name);
      if (!exist) acc.push({ name: tag.name, en: tag.en, zh: tag.zh });
    });
    return acc;
  }, []);

  return (
    <Container>
      <Content>
        <Landing lang={lang} />
        <Profile
          lang={lang}
          experiences={experiences}
          educations={educations}
          tags={tags}
        />
      </Content>
    </Container>
  );
};

export default memo(Home);
