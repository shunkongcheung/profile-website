import axios from "axios";
import moment from "moment";

interface RawVideo {
  id: {
    videoId: string;
  },
  snippet: {
    description: string;
    title: string;
    publishedAt: string;
  }
}

interface RawYoutuber{
  snippet: {
    description: string;
    title: string;
    publishedAt: string;
    thumbnails:{
      default: {
        url: string;
      }
    }
  }
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

const fetchFromYoutuber = async<T extends object>(params: object) => {
  const options = {
    method: 'GET',
    url: 'https://youtube.googleapis.com/youtube/v3/search',
    params: {
      part:'snippet',
      ...params,
      key:process.env.GOOGLE_API_KEY,
    },
  };
  const response = await axios.request(options)
  return response.data.items as Array<T>;
}

const getVideoMp3Url = async (videoId: string): Promise<string> => {
	const options = {
		method: 'GET',
		url: 'https://youtube-mp36.p.rapidapi.com/dl',
		params: { id: videoId },
		headers: {
			'X-RapidAPI-Key': process.env.RAPID_API_KEY,
			'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
		}
	};
	const response = await axios.request(options)
	return response.data.link;
}

const getVideos = async (channelId: string, publishedAfter: Date):Promise<Array<Video>> => {
  const items = await fetchFromYoutuber<RawVideo>({
    channelId,
    maxResults:3,
    order:"date",
    publishedAfter,
    type: "video",
  })
  return Promise.all(items.map(async item => ({
    downloadUrl: await getVideoMp3Url(item.id.videoId),
    videoId: item.id.videoId,
    description: item.snippet.description,
    title: item.snippet.title,
    publishedAt: new Date(item.snippet.publishedAt),
  })));
}

const getYoutubers = async () => {
  const today = moment();
  const publishedAfter = today.add(-3, "day");

  return Promise.all(youtubers.map(async ({ channelId, title }): Promise<Youtuber> => {
    try{
      const [items, videos] = await Promise.all([
        fetchFromYoutuber<RawYoutuber>({
          channelId,
          type: "channel",
        }),
       getVideos(channelId, publishedAfter.toDate())
      ]);

      const { snippet } = items[0];
      return {
        channelId,
        description: snippet.description,
        publishedAt: new Date(snippet.publishedAt),
        title: snippet.title,
        thumbnail: snippet.thumbnails.default.url,
        videos,
      }
    }catch {
      return {
        channelId,
        description: "",
        publishedAt: new Date(),
        title,
        thumbnail: "",
        videos: [],
      }
    }
  }))
};

export default getYoutubers;
