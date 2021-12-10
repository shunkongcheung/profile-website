import React, { memo } from "react";
import moment from "moment";
import styled, { keyframes } from "styled-components";

import { AppBar, BackToTop, SafeView } from "../../components";
import { Lang, I18N } from "../../types";

import Landing from "./Landing";
import ExperienceList from "./ExperienceList";
import SocialLinks from "./SocialLinks";
import TagList from "./TagList";
import Tools from "./Tools";
import useTags from "./useTags";
import HighlightList from "./HighlightList";

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
  descEn: string;
  descZh: string;
  thumbnail: string;
  tags: Array<{ name: string }>;
}

interface Job {
  id: number;
  images: Array<string>;
  companyName: string;
  companyUrl?: string;
  title: string;
  dateFrom: Date;
  dateTo?: Date;
  isEducation?: boolean;
  isPartTime?: boolean;
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

interface NavItem {
  name: string;
  ref: HTMLElement;
}

interface NavState {
  tools?: NavItem;
  highlights?: NavItem;
  experience?: NavItem;
  education?: NavItem;
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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  border: 1px sold red;

  @media (min-width: 700px) {
    height: calc(100vh - 80px);
  }
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
  const [navs, setNavs] = React.useState<NavState>({});

  const handleNav = React.useCallback(
    (name: string) => {
      return (item: NavItem) => {
        setNavs((o) => {
          if (!!o[name]) return o;
          return { ...o, [name]: item };
        });
      };
    },
    [setNavs]
  );

  const handleScroll = React.useCallback(() => {
    if (!navs.tools) return;
    navs.tools.ref.scrollIntoView({ behavior: "smooth" });
  }, [navs]);

  const allExps = React.useMemo(
    () =>
      jobs.map((itm) => ({
        id: itm.id,
        images: itm.images,
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
        desc: { en: highlight.descEn, zh: highlight.descZh },
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
      })),
    [tools]
  );

  const { tagIds, handleTag } = useTags(tags);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(navs);

  return (
    <Container>
      <AppBar
        navs={[
          navs.tools,
          navs.highlights,
          navs.experience,
          navs.education,
        ].filter((itm) => !!itm)}
      />
      <SafeView>
        <LandContainer>
          <Landing lang={lang} />
          <SocialLinks lang={lang} />
          <BtnContainer>
            <DownBtn onClick={handleScroll}>
              <ArrowDown />
            </DownBtn>
          </BtnContainer>
        </LandContainer>
        <Tools lang={lang} tools={tTools} handleNav={handleNav("tools")} />
        <TagList
          lang={lang}
          tagIds={tagIds}
          tags={tags}
          handleTag={handleTag}
        />
        <HighlightList
          lang={lang}
          highlights={tHighlights}
          handleNav={handleNav("highlights")}
        />
        <ExperienceList
          lang={lang}
          data={experiences}
          tagIds={tagIds}
          handleTag={handleTag}
          handleNav={handleNav("experience")}
          title={Trans.experience[lang]}
        />
        <ExperienceList
          lang={lang}
          data={educations}
          tagIds={tagIds}
          handleTag={handleTag}
          handleNav={handleNav("education")}
          title={Trans.education[lang]}
        />
        <BackToTop />
      </SafeView>
    </Container>
  );
};

export default memo(Home);
