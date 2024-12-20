import type {
  SearchResult,
  Video,
  ErrorResponse,
  BackendPlaylistsList,
  BackendPlaylist,
  PlaylistsList,
  Playlist,
} from "./types";
import { SEARCH_PATH, VIDEOS_PATH, PLAYLISTS_PATH, fetcher } from "./api";
import useSWR from "swr";

function useGet<DataType>(url: string) {
  return useSWR<DataType>(url, fetcher.bind(null, "GET"));
}

export function useSearch(query: string) {
  const queryParams = new URLSearchParams({ q: query });
  return useGet<SearchResult>(`${SEARCH_PATH}?${queryParams}`);
}

export function useVideo(videoId: string) {
  return useGet<Video | ErrorResponse>(`${VIDEOS_PATH}/${videoId}`);
}

export function usePlaylists(userId: string) {
  const queryParams = new URLSearchParams({ userId });
  const response = useGet<BackendPlaylistsList>(
    `${PLAYLISTS_PATH}?${queryParams}`,
  );

  if (response.data === undefined) {
    return { ...response, data: undefined };
  }

  const data = Object.fromEntries(
    response.data.playlists.map((playlist) => [
      playlist.id,
      {
        ...playlist,
        videos: Object.fromEntries(
          playlist.videos.map((video) => [video.videoId, video]),
        ),
      },
    ]),
  ) as unknown as PlaylistsList;

  return { ...response, data };
}

export function usePlaylist(playlistId: string) {
  const response = useGet<BackendPlaylist | ErrorResponse>(
    `${PLAYLISTS_PATH}/${playlistId}`,
  );
  if (response.data === undefined) {
    return { ...response, data: undefined };
  }

  if ("success" in response.data) {
    return response;
  }

  const data = {
    ...response.data,
    videos: Object.fromEntries(
      response.data.videos.map((video) => [video.videoId, video]),
    ),
  } as unknown as Playlist;

  return { ...response, data };
}
