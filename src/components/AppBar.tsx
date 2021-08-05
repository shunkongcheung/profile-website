import React, { memo } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

const Container = styled.div`
  width: 100%;
  height: 20px;

  padding-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  z-index: 1;
`;

const LinkContainer = styled.div`
  margin-left: auto;
`;

interface AppBarProps {}

const AppBar: React.FC<AppBarProps> = () => {
  const { pathname } = useRouter();
  const noLangPathname = pathname.split("/").slice(2).join("/");
  return (
    <Container>
      <LinkContainer>
        <Link href={`/en/${noLangPathname}`}>Eng</Link>
        <Link href={`/zh/${noLangPathname}`}>中文</Link>
      </LinkContainer>
    </Container>
  );
};

export default memo(AppBar);
