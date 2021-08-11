import React, { memo } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { useDarkModeContext, useWindowSize } from "../hooks";

const BackBtn = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;

  padding: 0;
  height: 30px;
  width: 30px;
`;

const BackArrow = styled.div<{ mode: string }>`
  width: 100%;
  height: 100%;

  background: url(/arrow-left-${(props) => props.mode}.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const LinkContainer = styled.div`
  margin-left: 10px;
`;

const ModeBtn = styled.button`
  width: 30px;
  width: 30px;
  background: transparent;
  border: 0;
  margin-left: auto;
  position: relative;
  cursor: pointer;
`;

const ModeImg = styled.div<{ isVisible: boolean; url: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  background: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  transition: opacity 0.5s linear;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
`;

const HamburgerBtn = styled.button<{ color: string }>`
  height: 30px;
  width: 45px;

  padding: 0;
  background: transparent;
  border: 0;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  div {
    width: 100%;
    height: 25%;
    background: ${(props) => props.color};
    border-radius: 5px;
    transition: background 0.2s ease-in;
  }

  &:hover div {
    text-decoration: underline;
  }

  display: flex;
  @media (min-width: 700px) {
    display: none;
  }
`;

const DesktopLink = styled.button<{ color: string }>`
  border: 0;
  background: transparent;
  color: ${(props) => props.color};
  margin-right: 1rem;

  font-size: 1rem;
  @media (min-width: 800px) {
    font-size: 1.2rem;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const Cross = styled.button<{ mode: string }>`
  border: 0;
  margin-left: auto;
  background: url(/cross-${(props) => props.mode}.png);
  background-size: cover;
  background-repeat: no-repeat;
  width: 2rem;
  height: 2rem;

  cursor: pointer;
`;

const DesktopLinkContainer = styled.div`
  display: none;
  @media (min-width: 700px) {
    display: block;
  }
`;

const MobileContainer = styled.div<{
  background: string;
  open: boolean;
}>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background: ${(props) => props.background};

  display: flex;
  flex-direction: column;
  padding: 1rem;

  transition: transform 0.5s ease-in;
  transform-origin: 0 0;
  transform: translateY(${(props) => (props.open ? 0 : -100)}%);
`;

const MobileNavItem = styled.button<{ color: string }>`
  background: transparent;
  border: 0;
  margin: 2rem auto;
  color: ${(props) => props.color};
  font-weight: 500;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Container = styled.div<{ background: string }>`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 2rem;
  top: 0;
  z-index: 1;
  position: sticky;
  background: ${(props) => props.background};

  padding: 1rem 1.5rem;
  @media (min-width: 600px) {
    padding: 1rem 3rem;
  }
`;

const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1050px;
  display: flex;
`;

interface AppBarProps {
  navs: Array<NavItem>;
}

interface NavItem {
  ref: HTMLElement;
  name: string;
}

const AppBar: React.FC<AppBarProps> = ({ navs }) => {
  const [open, setOpen] = React.useState(false);
  const { mode, setMode } = useDarkModeContext();

  const theme = {
    light: {
      background: "#3b82f6",
      color: "#f4f4f5",
    },
    dark: {
      background: "#2d3e50",
      color: "#f43f5e",
    },
  };

  const { pathname, push, query } = useRouter();
  const noLangPathname = pathname.split("/").slice(2).join("/");
  const lang = pathname.split("/")[1];

  const { width } = useWindowSize();

  React.useEffect(() => {
    if (width >= 700) setOpen(false);
  }, [width]);

  return (
    <>
      <Container background={theme[mode].background}>
        <Content>
          {!!navs.length ? (
            <HamburgerBtn
              onClick={() => setOpen(true)}
              color={theme[mode].color}
            >
              <div></div>
              <div></div>
              <div></div>
            </HamburgerBtn>
          ) : (
            <BackBtn onClick={() => push(`/${lang}`)}>
              <BackArrow mode={mode} />
            </BackBtn>
          )}
          <DesktopLinkContainer>
            {navs.map(({ name, ref }) => (
              <DesktopLink
                color={theme[mode].color}
                key={`DesktopLink-${name}`}
                onClick={() => ref.scrollIntoView({ behavior: "smooth" })}
              >
                {name}
              </DesktopLink>
            ))}
          </DesktopLinkContainer>
          <ModeBtn
            onClick={() => setMode((o) => (o === "dark" ? "light" : "dark"))}
          >
            <ModeImg url="/dark-mode.png" isVisible={mode === "dark"} />
            <ModeImg url="/light-mode.png" isVisible={mode === "light"} />
          </ModeBtn>
          <LinkContainer>
            <DesktopLink
              onClick={() => push({ pathname: `/en/${noLangPathname}`, query })}
              color={theme[mode].color}
            >
              ENG
            </DesktopLink>
            <DesktopLink
              onClick={() => push({ pathname: `/zh/${noLangPathname}`, query })}
              color={theme[mode].color}
            >
              繁
            </DesktopLink>
          </LinkContainer>
        </Content>
      </Container>
      <MobileContainer open={open} background={theme[mode].background}>
        <Cross onClick={() => setOpen(false)} mode={mode} />
        {navs.map(({ name, ref }) => (
          <MobileNavItem
            color={theme[mode].color}
            key={`DesktopLink-${name}`}
            onClick={() => {
              setOpen(false);
              setTimeout(() => {
                ref.scrollIntoView({ behavior: "smooth" });
              }, 400);
            }}
          >
            {name}
          </MobileNavItem>
        ))}
      </MobileContainer>
    </>
  );
};

export default memo(AppBar);
