import type * as youtube from "@/hooks/youtube";
import { List } from "@/components/Theme";
import { VideosListItem } from "@/components/VideosList/VideosListItem";

export type VideosListSize = "md" | "sm";

export interface VideosListProps {
  videos: youtube.SearchResult;
  getVideoUrl(videoId: string): string;
  size?: VideosListSize;
}

export function VideosList({
  videos,
  getVideoUrl,
  size = "md",
}: VideosListProps) {
  return (
    <List $fontSize={size === "md" ? "1rem" : "0.8rem"} $margin="0 10px">
      {videos.map((video) => (
        <VideosListItem
          key={video.id.videoId}
          video={video}
          toUrl={getVideoUrl(video.id.videoId)}
          size={size}
        />
      ))}
    </List>
  );
}
