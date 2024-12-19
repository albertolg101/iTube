import axios from "axios";
import { Playlist, PlaylistVideo } from "@/hooks/youtube/types";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

export const API_PATH = "https://harbour.dev.is/api";
export const SEARCH_PATH = `${API_PATH}/search`;
export const VIDEOS_PATH = `${API_PATH}/videos`;
export const PLAYLISTS_PATH = `${API_PATH}/playlists`;

export async function fetcher(method: HTTPMethod, url: string, body?: unknown) {
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

type CreatePlaylistResponse = {
  id: string;
};

export async function createPlaylist(
  userId: string,
  name: string,
): Promise<CreatePlaylistResponse> {
  const body = { name, userId };
  return fetcher("POST", PLAYLISTS_PATH, { body });
}

type DestroyPlaylistResponse = {
  success: boolean;
};

export async function destroyPlaylist(
  playlistId: string,
): Promise<DestroyPlaylistResponse> {
  return fetcher("DELETE", `${PLAYLISTS_PATH}/${playlistId}`);
}

type updatePlaylistResponse = {
  success: boolean;
};

export async function updatePlaylist(
  playlistId: string,
  playlist: Playlist,
): Promise<updatePlaylistResponse> {
  return fetcher("PUT", `${PLAYLISTS_PATH}/${playlistId}`, { playlist });
}

export async function addVideoToPlaylist(
  playlistId: string,
  video: PlaylistVideo,
): Promise<Playlist> {
  return fetcher("POST", `${PLAYLISTS_PATH}/${playlistId}/videos`, video);
}

export async function removeVideoFromPlaylist(
  playlistId: string,
  videoId: string,
): Promise<Playlist> {
  return fetcher("DELETE", `${PLAYLISTS_PATH}/${playlistId}/videos/${videoId}`);
}
