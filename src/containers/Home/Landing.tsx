import React, { memo } from "react";
import styled, { useTheme } from "styled-components";

import { Carousel } from "../../components";
import { useWindowSize } from "../../hooks";
import { I18N, Lang } from "../../types";

import BlendImage from "./BlendImage";
import FlippyImage from "./FlippyImage";
import ThreeDImage from "./ThreeDImage";

interface LandingProps {
  lang: Lang;
}

const Container = styled.div`
  width: 100%;

  margin-bottom: 2rem;

  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    flex-direction: row;
    height: 20rem;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    align-items: start;
    margin-right: auto;
    width: 40%;
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  height: 250px;

  @media (min-width: 700px) {
    width: 50%;
    height: 300px;
  }
`;

const Desc = styled.p`
  line-height: 1.5rem;
  color: ${(props) => props.theme.colors.primary[300]};
`;

const MyImage = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;

  background: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Name = styled.h1`
  margin-top: 0;
  color: ${(props) => props.theme.colors.primary[500]};

  font-size: 1.5rem;
  @media (min-width: ${(props) => props.theme.breakpoints.sm}px) {
    font-size: 2rem;
  }
`;

const Location = styled.h2`
  margin: 0;
  font-weight: 300;
  color: ${(props) => props.theme.colors.primary[50]};
`;

const TRANS: { [x: string]: I18N } = {
  desc: {
    en: "Advanced in TypeScript, Python, React.js, Next.js. Proficient in Linux, React Native Firebase, Netlify, Vercel, Verilog and MatLab. Experienced in building web / mobile applications and hosting backend services with AWS. Enthusiastic in becoming a software engineer under a pioneering technological firm.",
    zh: "精通 TypeScript、Python、React.js、Next.js。 熟用 Linux、React Native Firebase、Netlify、Vercel、Verilog 和 MatLab。 擁有使用 AWS 構建 Web/移動應用程序和託管後端服務的經驗。 熱衷於成為一家領先的技術公司的軟件工程師。 ",
  },
  name: {
    en: "Shun Kong Cheung",
    zh: "張淳罡",
  },
  location: {
    en: "Toronto, Canada",
    zh: "多倫多 加拿大",
  },
};

const Landing: React.FC<LandingProps> = ({ lang = "en" }) => {
  const [idx, setIdx] = React.useState(0);
  const { width } = useWindowSize();
  const theme = useTheme();

  React.useEffect(() => {
    const clear = setInterval(() => setIdx((o) => (o + 1) % 3), 5000);
    return () => clearInterval(clear);
  }, [setIdx]);

  return (
    <Container>
      <Content>
        <Name>{TRANS.name[lang]}</Name>
        <Location>{TRANS.location[lang]}</Location>
        <Desc>{TRANS.desc[lang]}</Desc>
      </Content>
      <CarouselContainer>
        <Carousel control={{ idx }}>
          {width > (theme as any).breakpoints.sm
            ? [
                <ThreeDImage
                  key="LandingCarouselAnimate-1"
                  imgSrc={"/home-second-image.jpg"}
                  isStart={idx === 0}
                />,
                <FlippyImage
                  key="LandingCarouselAnimate-2"
                  imgSrc={"/home-first-image.jpg"}
                  isStart={idx === 1}
                />,
                <BlendImage
                  key="LandingCarouselAnimate-3"
                  imgSrc={"/home-third-image.jpg"}
                  isStart={idx === 2}
                />,
              ]
            : [
                <MyImage
                  src="/home-second-image.jpg"
                  key="LandingCarousel-1"
                />,
                <MyImage src="/home-first-image.jpg" key="LandingCarousel-2" />,
                <MyImage src="/home-third-image.jpg" key="LandingCarousel-3" />,
              ]}
        </Carousel>
      </CarouselContainer>
    </Container>
  );
};

export default memo(Landing);
