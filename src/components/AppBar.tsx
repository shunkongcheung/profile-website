import React, { memo } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

import { useWindowSize } from "../hooks";

const Container = styled.div`
  width: 100%;

  padding-top: 1rem;
  padding-bottom: 2rem;
  display: flex;
  z-index: 1;
  top: 0;
  position: sticky;
  background: #2d3e50;
`;

const LinkContainer = styled.div`
  margin-left: auto;
`;

const HamburgerBtn = styled.button`
  height: 30px;
  width: 45px;
  background: transparent;
  border: 0;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  div {
    width: 100%;
    height: 25%;
    background: ${(props) => props.theme.colors.primary[500]};
    border-radius: 5px;
    transition: background 0.2s ease-in;
  }

  &:hover div {
    background: ${(props) => props.theme.colors.primary[700]};
  }

  display: flex;
  @media (min-width: 700px) {
    display: none;
  }
`;

const DesktopLink = styled.button`
  border: 0;
  background: transparent;
  color: ${(props) => props.theme.colors.primary[500]};
  margin-right: 1rem;

  font-size: 1rem;
  @media (min-width: 800px) {
    font-size: 1.2rem;
  }

  &:hover {
    color: ${(props) => props.theme.colors.primary[400]};
    text-decoration: underline;
  }
`;

const Cross = styled.button`
  border: 0;
  margin-left: auto;
  background: url(/cross.png);
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
  open: boolean;
}>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background: #2d3e50;

  display: flex;
  flex-direction: column;
  padding: 1rem;

  transition: transform 0.5s ease-in;
  transform-origin: 0 0;
  transform: translateY(${(props) => (props.open ? 0 : -100)}%);
`;

const MobileNavItem = styled.button`
  background: transparent;
  border: 0;
  margin: 2rem auto;
  color: ${(props) => props.theme.colors.primary[500]};
  font-weight: 500;
  font-size: 1.5rem;
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

  const { pathname } = useRouter();
  const noLangPathname = pathname.split("/").slice(2).join("/");

  const { width } = useWindowSize();

  React.useEffect(() => {
    if (width >= 700) setOpen(false);
  }, [width]);

  return (
    <>
      <Container>
        <HamburgerBtn onClick={() => setOpen(true)}>
          <div></div>
          <div></div>
          <div></div>
        </HamburgerBtn>
        <DesktopLinkContainer>
          {navs.map(({ name, ref }) => (
            <DesktopLink
              key={`DesktopLink-${name}`}
              onClick={() => ref.scrollIntoView({ behavior: "smooth" })}
            >
              {name}
            </DesktopLink>
          ))}
        </DesktopLinkContainer>
        <LinkContainer>
          <Link href={`/en/${noLangPathname}`}>Eng</Link>
          <Link href={`/zh/${noLangPathname}`}>中文</Link>
        </LinkContainer>
      </Container>
      <MobileContainer open={open}>
        <Cross onClick={() => setOpen(false)} />
        {navs.map(({ name, ref }) => (
          <MobileNavItem
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
