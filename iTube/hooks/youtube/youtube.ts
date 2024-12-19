import type {
  SearchResult,
  Video,
  ErrorResponse,
  PlaylistsList,
  Playlist,
} from "./types";

import axios from "axios";
import useSWR from "swr";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

const API_PATH = "https://harbour.dev.is/api";
const SEARCH_PATH = `${API_PATH}/search`;
const VIDEOS_PATH = `${API_PATH}/videos`;
const PLAYLISTS_PATH = `${API_PATH}/playlists`;

async function fetcher(method: HTTPMethod, url: string, body?: unknown) {
  switch (method) {
    case "GET":
      return axios.get(url).then((res) => res.data);
    case "POST":
      return axios.post(url, body).then((res) => res.data);
    case "PUT":
      return axios.put(url, body).then((res) => res.data);
    case "DELETE":
      return axios.delete(url).then((res) => res.data);
  }
}

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

  const { data, mutate, isLoading, error } = useGet<PlaylistsList>(
    `${PLAYLISTS_PATH}?${queryParams}`,
  );

  async function create(name: string) {
    const body = { name, userId };
    return fetcher("POST", PLAYLISTS_PATH, { body }).then((data) => {
      mutate();
      return data;
    });
  }

  async function destroy(playlistId: string) {
    return fetcher("DELETE", `${PLAYLISTS_PATH}/${playlistId}`).then((data) => {
      mutate();
      return data;
    });
  }

  const handlers = { create, destroy };

  return {
    data,
    handlers: data === undefined ? undefined : handlers,
    isLoading,
    error,
  };
}

export function usePlaylist(playlistId: string) {
  const { data, mutate, isLoading, error } = useGet<Playlist>(
    `${PLAYLISTS_PATH}/${playlistId}`,
  );

  async function updateName(name: string) {
    if (data !== undefined) {
      const body = { ...data, name: name };
      return fetcher("PUT", `${PLAYLISTS_PATH}/${playlistId}`, { body }).then(
        (data) => {
          mutate();
          return data;
        },
      );
    }
  }

  async function addVideo(videoId: string) {
    if (data !== undefined) {
      const body = { ...data, videos: [...data.videos, videoId] };
      if (!data.videos.includes(videoId)) {
        return fetcher("PUT", `${PLAYLISTS_PATH}/${playlistId}`, { body }).then(
          (data) => {
            mutate();
            return data;
          },
        );
      }
    }
  }

  async function removeVideo(videoId: string) {
    if (data !== undefined) {
      const videoIndex = data.videos.indexOf(videoId);
      if (videoIndex !== -1) {
        const body = {
          ...data,
          videos: data.videos.filter((_, index) => index !== videoIndex),
        };
        return fetcher("PUT", `${PLAYLISTS_PATH}/${playlistId}`, { body }).then(
          (data) => {
            mutate();
            return data;
          },
        );
      }
    }
  }

  const handlers = { updateName, addVideo, removeVideo };

  return {
    data,
    handlers: data === undefined ? undefined : handlers,
    isLoading,
    error,
  };
}
