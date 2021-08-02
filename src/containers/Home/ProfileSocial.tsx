import React, { memo } from "react";
import styled from "styled-components";

import { Lang } from "../../types";

interface ProfileScocialProps {
  lang: Lang;
}

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const SocialItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Icon = styled.div<{ src: string }>`
  width: 2rem;
  height: 2rem;
  background: url(${(props) => props.src});
  background-size: contain;
  background-position: center;
`;

const Clickable = styled.a`
  margin-left: 1rem;
  color: ${(props) => props.theme.colors.primary[900]};

  &:hover {
    color: ${(props) => props.theme.colors.primary[700]};
  }
`;

const Social = [
  {
    id: "github",
    name: "@shunkongcheung",
    url: "https://github.com/shunkongcheung",
    src: "/home-social-github.png",
  },
  {
    id: "linkedin",
    name: "@shunkongcheung",
    url: "https://www.linkedin.com/in/shun-kong-cheung-1b948a11b/",
    src: "/home-social-linkedin.png",
  },
  {
    id: "email",
    name: "shunkongcheung@tutanota.com",
    url: "mailto:shunkongcheung@tutanota.com",
    src: "/home-social-email.png",
  },
];

const ProfileScocial: React.FC<ProfileScocialProps> = () => {
  return (
    <Container>
      {Social.map(({ id, name, url, src }) => (
        <SocialItem key={`SocialItem-${id}`}>
          <Icon src={src} />
          <Clickable href={url} target="_blank" referrerPolicy="no-referrer">
            {name}
          </Clickable>
        </SocialItem>
      ))}
    </Container>
  );
};

export default memo(ProfileScocial);