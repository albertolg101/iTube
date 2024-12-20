export type ErrorResponse = {
  status: false;
  success: false;
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
  shortDescription: string;
  description: string;
  owner: string;
  thumbnailUrl: string;
  datePublished: string;
  genre: string;
  isFamilyFriendly: boolean;
  duration: number;
  views: number;
  likeCount: number;
};

export type PlaylistVideo = {
  videoId: string;
  thumbnailUrl: string;
  duration: number;
  title: string;
  views: number;
  publishedAt: string;
  owner: string;
  shortDescription: string;
};

export type BackendPlaylist = {
  id: string;
  name: string;
  videos: PlaylistVideo[];
};

export type Playlist = BackendPlaylist & {
  [videoId: string]: PlaylistVideo;
};

export type BackendPlaylistsList = {
  playlists: Playlist[];
};

export type PlaylistsList = Record<string, Playlist>;
