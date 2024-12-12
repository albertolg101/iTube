import type { VideosList } from "./youtube.d";

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
