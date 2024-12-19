export type ErrorResponse = {
  status: false;
};

export type SearchResultItem = {
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

export type SearchResult = SearchResultItem[];

export type Video = {
  url: string;
  title: string;
  description: string;
  owner: string;
  thumbnailUrl: string;
  datePublished: string;
  genre: string;
  isFamilyFriendly: boolean;
  duration: number;
  views: number;
  likeCount: number;
  dislikeCount: number;
};

export type Playlist = {
  id: string;
  name: string;
  videos: string[];
};

export type PlaylistsList = Playlist[];
