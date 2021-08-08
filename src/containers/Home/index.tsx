import React, { memo } from "react";
import moment from "moment";
import styled, { keyframes } from "styled-components";

import { AppBar } from "../../components";
import { Lang, I18N } from "../../types";

import Landing from "./Landing";
import ExperienceList from "./ExperienceList";
import ProfileSocial from "./ProfileSocial";
import Tools from "./Tools";
import TagList from "./TagList";
import useTags from "./useTags";

interface HomeProps {
  lang: Lang;
  highlights: Array<Highlight>;
  jobs: Array<Job>;
  tools: Array<Tool>;
}

interface Highlight {
  id: number;
  nameEn: string;
  nameZh: string;
  thumbnail: string;
  tags: Array<{ name: string }>;
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

const bounce = keyframes`
0% { transform: translateY(0px); }
50% { transform: translateY(-20px); }
`;

const ArrowDown = styled.div`
  width: 50px;
  height: 30px;
  background: url(/arrow-down.svg);
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;

  animation: ${bounce} 1s;
  animation-iteration-count: 3;
`;

const DownBtn = styled.button`
  background: transparent;
  border: 0;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
`;

const LandContainer = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  border: 1px sold red;
`;

const Trans: { [x: string]: I18N } = {
  experience: {
    en: "Experiences",
    zh: "經驗",
  },
  education: {
    en: "Education",
    zh: "學歷",
  },
};

const Home: React.FC<HomeProps> = ({ lang, highlights, jobs, tools }) => {
  const toolRef = React.useRef<HTMLElement>();

  const handleScroll = React.useCallback(() => {
    if (!toolRef.current) return;
    toolRef.current.scrollIntoView({ behavior: "smooth" });
  }, [toolRef]);

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

  const tHighlights = React.useMemo(
    () =>
      highlights.map((highlight) => ({
        id: highlight.id,
        name: { en: highlight.nameEn, zh: highlight.nameZh },
        thumbnail: highlight.thumbnail,
        tags: tags.filter(
          (aTag) => !!highlight.tags.find((hTag) => hTag.name === aTag.name)
        ),
      })),
    [highlights, tags]
  );

  const tTools = React.useMemo(
    () =>
      tools.map((itm) => ({
        ...itm,
        icon: `https://home-backend.shunkongcheung.com/static/tools/${itm.icon}`,
      })),
    [tools]
  );

  const { tagIds, handleTag } = useTags(tags);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <AppBar />
      <LandContainer>
        <Landing lang={lang} />
        <ProfileSocial lang={lang} />
        <BtnContainer>
          <DownBtn onClick={handleScroll}>
            <ArrowDown />
          </DownBtn>
        </BtnContainer>
      </LandContainer>
      <Tools
        lang={lang}
        tools={tTools}
        handleRef={(ref) => (toolRef.current = ref)}
      />
      <TagList lang={lang} tagIds={tagIds} tags={tags} handleTag={handleTag} />
      <ExperienceList
        lang={lang}
        data={experiences}
        tagIds={tagIds}
        handleTag={handleTag}
        title={Trans.experience[lang]}
      />
      <ExperienceList
        lang={lang}
        data={educations}
        tagIds={tagIds}
        handleTag={handleTag}
        title={Trans.education[lang]}
      />
    </Container>
  );
};

export default memo(Home);
