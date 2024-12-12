export type VideosListItem = {
  id: {
    videoId: string;
  };
  url: string;
  title: string;
  channelName: string;
  description: string;
  duration_raw: string;
  snippet: {
    url: string;
    duration: string;
    publishedAt: string;
    thumbnails: {
      id: string;
      url: string;
      height: number;
      width: number;
    };
    title: string;
    views: string;
  };
  views: string;
};

export type VideosList = VideoListItem[];
