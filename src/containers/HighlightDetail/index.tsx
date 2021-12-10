import React, { memo } from "react";
import styled from "styled-components";
import {
  AppBar,
  BackToTop,
  Carousel,
  SafeView,
  TagItem,
} from "../../components";

import { I18N, Lang } from "../../types";

interface HighlightDetailProps {
  nameEn: string;
  nameZh: string;
  descEn: string;
  descZh: string;
  assets: Array<string>;
  links: Array<string>;
  tags: Array<Tag>;
  lang: Lang;
}

interface Tag {
  name: string;
  en: string;
  zh: string;
}

const AssetContainer = styled.div`
  width: 300px;
  height: 200px;
  @media (min-width: 400px) {
    width: 350px;
    height: 250px;
  }
  @media (min-width: 500px) {
    width: 400px;
    height: 300px;
  }
  @media (min-width: 700px) {
    width: 600px;
    height: 400px;
  }
  overflow: hidden;

  margin-left: auto;
  margin-right: auto;

  border-radius: 15px;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const CarouselBtn = styled.button<{ isFocus: boolean }>`
  cursor: pointer;
  width: 20px;
  height: 20px;

  margin-left: 5px;
  margin-right: 5px;

  border: 2px solid ${(props) => props.theme.colors.primary[700]};
  background: ${(props) =>
    props.isFocus ? props.theme.colors.primary[500] : "transparent"};
`;

const Container = styled.div``;

const Header = styled.h1`
  color: ${(props) => props.theme.colors.primary[500]};
`;

const Col = styled.div<{ width: number }>`
  width: 100%;
  @media (min-width: 600px) {
    width: 40%;
  }
`;

const Desc = styled.p`
  color: ${(props) => props.theme.colors.primary[300]};
  line-height: 1.5rem;
`;

const LinkItem = styled.a`
  margin-bottom: 1rem;
  margin-left: 0;
  display: block;
`;

const LinkHeader = styled.h2`
  font-size: 2rem;
  margin-top: 0;
  color: ${(props) => props.theme.colors.primary[500]};
`;

const MyImage = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Trans: { [x: string]: I18N } = {
  link: {
    en: "Learn more",
    zh: "了解更多",
  },
};

const HighlightDetail: React.FC<HighlightDetailProps> = ({
  nameEn,
  nameZh,
  descZh,
  descEn,
  assets,
  links,
  tags,
  lang,
}) => {
  const [carouselIdx, setCarouselIdx] = React.useState(0);
  const name: I18N = {
    en: nameEn,
    zh: nameZh,
  };
  const desc: I18N = {
    en: descEn,
    zh: descZh,
  };

  return (
    <Container>
      <AppBar navs={[]} />
      <SafeView>
        <Header>{name[lang]}</Header>
        <AssetContainer>
          <Carousel control={{ idx: carouselIdx }}>
            {assets
              .map((link) =>
                link.endsWith("mp4") ? (
                  <embed
                    src={link}
                    width="100%"
                    height="100%"
                    key={`MyEmbed-${link}`}
                  />
                ) : (
                  <MyImage src={link} key={`MyImage-${link}`} />
                )
              )}
          </Carousel>
        </AssetContainer>
        <BtnContainer>
          {assets.map((_, idx) => (
            <CarouselBtn
              onClick={() => setCarouselIdx(idx)}
              key={`CarouselBtn-${idx}`}
              isFocus={idx === carouselIdx}
            />
          ))}
        </BtnContainer>

        <Row>
          <Col width={40}>
            <TagContainer>
              {tags.map((itm) => (
                <TagItem key={`KeyItem-${nameEn}-${itm.name}`}>
                  {itm[lang]}
                </TagItem>
              ))}
            </TagContainer>
            <Desc>{desc[lang]}</Desc>
          </Col>
          <Col width={50}>
            <LinkHeader>{Trans.link[lang]}</LinkHeader>
            {links.map((link) => (
              <LinkItem
                key={`ExternalLink-${nameEn}-${link}`}
                href={link}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
              >
                {link}
              </LinkItem>
            ))}
          </Col>
        </Row>
        <BackToTop />
      </SafeView>
    </Container>
  );
};

export default memo(HighlightDetail);
