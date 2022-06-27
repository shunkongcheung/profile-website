import React from "react";

import Playlist from "../containers/Playlist";
import { youtubers } from "../data";

interface PlaylistPageProps {
  youtubers: Array<Youtuber>
}

interface Video {
  downloadUrl: string;
  videoId: string;
  description: string;
  title: string;
  publishedAt: string;
}

interface Youtuber {
  channelId: string;
  description: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  videos: Array<Video>;
}

export default function PlaylistPage({ youtubers }: PlaylistPageProps) {
  return <Playlist 
    youtubers={youtubers.map(youtuber => ({
      ...youtuber,
      publishedAt: new Date(youtuber.publishedAt),
      videos: youtuber.videos.map(video => ({
        ...video,
        publishedAt: new Date(video.publishedAt)
      }))
    }))}
  />;
}


export async function getStaticProps() {
  return {
    props: {
      youtubers: (await youtubers()).map(youtuber => ({
        ...youtuber, 
        publishedAt: youtuber.publishedAt.toISOString() ,
        videos: youtuber.videos.map(video => ({
          ...video,
          publishedAt: video.publishedAt.toISOString()
        }))
      }))
    }
  }
}
