export type ErrorResponse = {
  status: false;
}

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

export type VideoDetails = {
  url: string,
  title: string,
  description: string,
  owner: string,
  thumbnailUrl: string,
  datePublished: string,
  genre: string,
  isFamilyFriendly: boolean,
  duration: number,
  views: number,
  likeCount: number,
  dislikeCount: number,
}