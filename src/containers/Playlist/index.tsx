import React, { memo } from "react";
import styled  from "styled-components";
import Button from "../../components/Button";

interface PlaylistProps {
  youtubers: Array<Youtuber>
}

interface Video {
  downloadUrl: string;
  videoId: string;
  description: string;
  title: string;
  publishedAt: Date;
}

interface Youtuber {
  channelId: string;
  description: string;
  title: string;
  publishedAt: Date;
  thumbnail: string;
  videos: Array<Video>;
}

const Container = styled.div`
  width: 100%;
`;

const Youtuber = styled.div`

`

const Playlist: React.FC<PlaylistProps> = ({ youtubers }) => {
  const refresh = React.useCallback(async () => {
    await fetch("/api/refresh-playlist");
    window.location.reload();
  }, [])

  return (
    <Container>
      <Button onClick={refresh}>
        refresh
      </Button>
      hello world
      {youtubers.map(youtuber => <Youtuber key={youtuber.channelId}>{youtuber.title}</Youtuber>)}
    </Container>
  );

}

export default memo(Playlist);
