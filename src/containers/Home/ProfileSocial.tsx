import React, { memo } from "react";
import styled from "styled-components";

import { Lang } from "../../types";

interface ProfileScocialProps {
  lang: Lang;
}

const Container = styled.div``;

const SocialItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.6rem;
`;

const Icon = styled.div<{ src: string }>`
  width: 2rem;
  height: 2rem;
  background: url(${(props) => props.src});
  background-size: contain;
  background-position: center;
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
          <a
            href={url}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noreferrer"
          >
            {name}
          </a>
        </SocialItem>
      ))}
    </Container>
  );
};

export default memo(ProfileScocial);
