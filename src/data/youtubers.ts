import axios from "axios";

interface Youtuber {
  channelId: string;
  description: string;
  title: string;
  publishedAt: Date;
  thumbnail: string;
}
const youtubers = [
  {
    channelId: "UCmi1257Mo7v4ors9-ekOq1w",
    title: "Gavinchiu趙氏讀書生活",
  },
  {
    channelId: "UC_pnRSMEtnRVX1QzkxOFYcQ",
    title: "胡思頻道",
  },
  {
    channelId: "UCZ4AMrDcNrfy3X6nsU8-rPg",
    title: "Economics Explained",
  },
  {
    channelId: "UCSMqateX8OA2s1wsOR2EgJA",
    title: "TLDR News",
  },
  {
    channelId: "UC-uhvujip5deVcEtLxnW8qg",
    title: "TLDR News Global",
  },
  {
    channelId:"UC-eegKVWEgBCa4OzjnK_PtA",
    title: "TLDR News EU",
  },
  {
    channelId:"UCGg5QDOcFZYS3FbLVHRvJUw",
    title: "TLDR News US",
  },
  {
    channelId:"UCz_3xlMTVUYYTQqCfh9lD7w",
    title:  "TLDR News Daily",
  },
  {
    channelId:"UCC_tcsH_P-rWtHlm1TjKsyg",
    title:  "TLDR News UK",
  },
  {
    channelId: "UCGGrblndNzi86WY5lJkQJiA",
    title: "cheap",
  },
  {
    channelId: "UC1YY9hJoczkVVx0eG3y5Aag",
    title: "最深日本 -Studio Deepest Japan-",
  },
  {
    channelId: "UC5q0HLxSC8SJE9O7Gw3YYWg",
    title: "徐時論 TsuisTalk",
  },
  {
    channelId: "UC66ek7YldxB25SnDYtsy6OQ",
    title: "最深日本動漫 -Deepest Japan Animation-",
  },
  {
    channelId: "UC176GAQozKKjhz62H8u9vQQ",
    title: "Real Science",
  },
  {
    channelId: "UCwnKziETDbHJtx78nIkfYug",
    title: "CaspianReport",
  },
  {
    channelId: "UCzR-rom72PHN9Zg7RML9EbA",
    title: "PBS Eons",
  },
  {
    channelId: "UCtAIPjABiQD3qjlEl1T5VpA",
    title: "文昭談古論今 -Wen Zhao Official",
  },
]

const getYoutubers = async () => Promise.all(youtubers.map(async ({ channelId, title }): Promise<Youtuber> => {
  const options = {
    method: 'GET',
    url: 'https://youtube.googleapis.com/youtube/v3/search',
    params: {
      part:'snippet',
      channelId,
      maxResults:1,
      type: "channel",
      key: process.env.GOOGLE_API_KEY,
    },
  };

  try{
    const response = await axios.request(options)
    const { items } = response.data;

    if(!Array.isArray(items) || !items.length) {
      throw Error();
    }

    const {snippet} = items[0]
    return {
      channelId,
      description: snippet.description,
      title: snippet.title,
      thumbnail: snippet.thumbnails.default.url,
      publishedAt: new Date(snippet.publishedAt),
    }
  }catch {
    return {
      channelId,
      description: "",
      title,
      thumbnail: "",
      publishedAt: new Date(),
    }
  }
}));

export default getYoutubers;
