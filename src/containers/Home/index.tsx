import React, { memo } from "react";
import { Moment } from "moment";
import styled from "styled-components";

import { Lang } from "../../types";

import Landing from "./Landing";
import Profile from "./Profile";

interface HomeProps {
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
  isPartTime: boolean;
  images: Array<string>;
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

const Home: React.FC<HomeProps> = ({ lang, experiences, educations, tags }) => {
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
