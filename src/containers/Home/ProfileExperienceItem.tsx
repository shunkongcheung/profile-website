import React, { memo } from "react";
import styled from "styled-components";
import { Moment } from "moment";

import { Lang, I18N } from "../../types";

import { Carousel } from "../../components";
import ProfileTag from "./ProfileTag";

interface TagShape extends I18N {
  name: string;
}

interface ProfileExperienceItemProps {
  company: string;
  descriptions: Array<string>;
  dateFrom: Moment;
  dateTo: Moment;
  handleTagClick: (key: string) => any;
  images: Array<string>;
  isPartTime?: boolean;
  isLast: boolean;
  lang: Lang;
  link?: string;
  title: string;
  tags: Array<TagShape>;
}

const Company = styled.h4`
  font-weight: 400;
  margin: 0.5rem 0;
  color: ${(props) => props.theme.colors.primary[50]};
`;

const Container = styled.div<{ borderWidth: number }>`
  display: flex;
  padding: 10px 0;
  border 0px solid #ddd;
  border-bottom-width: ${(props) => props.borderWidth}px;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;

`;

const CarouselContainer = styled.div`
  width: 200px;
  margin-left: auto;

  margin-right: auto;
  height: 150px;

  @media (min-width: ${(props) => props.theme.breakpoints.sm}px) {
    height: 300px;
  }
`;

const Content = styled.div`
  flex: 1;
  max-width: calc(100% - 2rem);
  padding: 0 2rem;
`;

const DescList = styled.ul`
  padding-left: 17px;
`;

const DescItem = styled.li`
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.primary[50]};
`;

const Duration = styled.h5`
  margin-top: 0.4rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.primary[100]};
`;

const Link = styled.a`
  margin: 0;
`;

const MyImage = styled.div<{ src: string }>`
  margin: auto;
  width: 100%;
  height: 9rem;
  background: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const TagsContainer = styled.div`
  display: flex;
  width: 30rem;
  max-width: 100%;
  flex-wrap: wrap;
`;

const Title = styled.h3`
  margin: 0;
  color ${(props) => props.theme.colors.primary[500]};
`;

const Thumbnail = styled.div<{ src: string }>`
  margin: auto;
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
  handleTagClick,
  lang,
  images,
  isPartTime,
  isLast,
  link,
  tags,
  title,
}) => {
  const [idx, setIdx] = React.useState(0);
  const [isCursored, setIsCursored] = React.useState(false);

  const years = dateTo.diff(dateFrom, "years");
  let months = dateTo.diff(dateFrom, "months") % 12;
  if (!years && !months) months = 1;

  const isToday = Math.abs(dateTo.diff(new Date(), "days")) < 1;

  const toStr = isToday ? Trans.present[lang] : dateTo.format("MMM YY");

  React.useEffect(() => {
    if (isCursored) setIdx((o) => (o + 1) % (images.length + 1));

    const clear = setInterval(
      () => isCursored && setIdx((o) => (o + 1) % images.length),
      3000
    );
    return () => clearInterval(clear);
  }, [setIdx, isCursored, images]);

  return (
    <Container
      borderWidth={isLast ? 0 : 1}
      onMouseEnter={() => setIsCursored(true)}
      onMouseLeave={() => setIsCursored(false)}
    >
      <CarouselContainer>
        <Carousel control={{ idx }}>
          {images.map((src, idx) => (
            <MyImage key={`MyImage-${idx}-${src}`} src={src} />
          ))}
        </Carousel>
      </CarouselContainer>
      <Content>
        <Title>
          {title} - {isPartTime ? Trans.internship[lang] : Trans.fulltime[lang]}
        </Title>
        {!!link ? (
          <Company>
            <Link
              href={link}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
            >
              {company}
            </Link>
          </Company>
        ) : (
          <Company>{company}</Company>
        )}
        <Duration>
          {dateFrom.format("MMM YY")} - {toStr} / {!!years && `${years} yr`}{" "}
          {!!months && `${months} mos`}
        </Duration>
        <TagsContainer>
          {tags.map((tag, idx) => (
            <ProfileTag
              key={`ProfileTag-${idx}`}
              onClick={() => handleTagClick(tag.name)}
            >
              {tag[lang]}
            </ProfileTag>
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
