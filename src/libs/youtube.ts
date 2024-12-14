import type { VideosList, VideoDetails, ErrorResponse } from "./youtube.d";

import axios from "axios";
import useSWR from "swr";

async function fetcher(url: string) {
  const response = await axios.get(url);
  return response.data;
}

function useGet<DataType>(url: string) {
  return useSWR<DataType>(url, fetcher);
}

export function useSearch(query: string) {
  return useGet<VideosList>(`https://harbour.dev.is/api/search?q=${query}`);
}

export function useVideoDetails(videoId: string) {
  return useGet<VideoDetails | ErrorResponse>(
    `https://harbour.dev.is/api/videos/${videoId}`,
  );
}

export function numberToShortFormat(num: number): string {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)} B`;
  } else if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)} M`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)} K`;
  }
  return num.toString();
}

export function toTimeAgoString(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)} years ago`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} months ago`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} days ago`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} hours ago`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}
