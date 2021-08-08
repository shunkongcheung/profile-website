import React, { memo } from "react";
import moment from "moment";
import styled from "styled-components";

import { Lang } from "../../types";

import Landing from "./Landing";
import Profile from "./Profile";
import ProfileSocial from "./ProfileSocial";
import Tools from "./Tools";
import { AppBar } from "../../components";

interface HomeProps {
  lang: Lang;
  jobs: Array<Job>;
  tools: Array<Tool>;
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

interface Tool {
  id: number;
  name: string;
  icon: string;
}

const Container = styled.div`
  width: 100%;
`;

const Home: React.FC<HomeProps> = ({ lang, jobs, tools }) => {
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

  const tTools = React.useMemo(
    () =>
      tools.map((itm) => ({
        ...itm,
        icon: `https://home-backend.shunkongcheung.com/static/tools/${itm.icon}`,
      })),
    [tools]
  );

  return (
    <Container>
      <AppBar />
      <Landing lang={lang} />
      <ProfileSocial lang={lang} />
      <Tools lang={lang} tools={tTools} />
      <Profile
        lang={lang}
        experiences={experiences}
        educations={educations}
        tags={tags}
      />
    </Container>
  );
};

export default memo(Home);
