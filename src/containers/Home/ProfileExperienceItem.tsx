import React, { memo } from "react";
import styled from "styled-components";
import { Moment } from "moment";
import ProfileTag from "./ProfileTag";
import { Lang, I18N } from "../../types";

interface ProfileExperienceItemProps {
  company: string;
  descriptions: Array<string>;
  dateFrom: Moment;
  dateTo: Moment;
  isPartTime?: boolean;
  lang: Lang;
  link?: string;
  title: string;
  thumbnail: string;
  tags: Array<I18N>;
}

const Company = styled.h4`
  font-weight: 400;
  margin: 0.3rem 0;
`;

const Container = styled.div`
  display: flex;
  padding: 10px 0;
`;

const Content = styled.div`
  flex: 1;
  padding-left: 2rem;
`;

const DescList = styled.ul``;

const DescItem = styled.li`
  margin-bottom: 0.5rem;
`;

const Duration = styled.h5`
  margin-top: 0.4rem;
  font-weight: 300;
  color: #777;
`;

const TagsContainer = styled.div`
  display: flex;
  width: 30rem;
  max-width: 100%;
  flex-wrap: wrap;
`;

const Title = styled.h3`
  margin: 0;
`;

const Thumbnail = styled.div<{ src: string }>`
  width: 7rem;
  height: 7rem;
  background: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Trans: { [x: string]: I18N } = {
  fulltime: {
    en: "fulltime",
    zh: "全職",
  },
  internship: {
    en: "internship",
    zh: "實習",
  },
  present: {
    en: "present",
    zh: "現在",
  },
};

const ProfileExperienceItem: React.FC<ProfileExperienceItemProps> = ({
  company,
  descriptions,
  dateFrom,
  dateTo,
  lang,
  isPartTime,
  link,
  tags,
  title,
  thumbnail,
}) => {
  const years = dateTo.diff(dateFrom, "years");
  const months = dateTo.diff(dateFrom, "months");
  const isToday = Math.abs(dateTo.diff(new Date(), "days")) < 1;

  const toStr = isToday ? Trans.present[lang] : dateTo.format("MMM YY");
  return (
    <Container>
      <Thumbnail src={thumbnail} />
      <Content>
        <Title>
          {title} - {isPartTime ? Trans.internship[lang] : Trans.fulltime[lang]}
        </Title>
        {!!link ? (
          <a
            href={link}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noreferrer"
          >
            <Company>{company}</Company>
          </a>
        ) : (
          <Company>{company}</Company>
        )}
        <Duration>
          {dateFrom.format("MMM YY")} - {toStr} / {!!years && `${years} yr`}{" "}
          {months} mos
        </Duration>
        <TagsContainer>
          {tags.map((tag, idx) => (
            <ProfileTag key={`ProfileTag-${idx}`}>{tag[lang]}</ProfileTag>
          ))}
        </TagsContainer>

        <DescList>
          {descriptions.map((description, idx) => (
            <DescItem key={`DescItem-${company}-${idx}`}>
              {description}
            </DescItem>
          ))}
        </DescList>
      </Content>
    </Container>
  );
};

export default memo(ProfileExperienceItem);
