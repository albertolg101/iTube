import type * as youtube from "@/libs/youtube.d";
import { List } from "@/components/Theme";
import { VideosListItem } from "@/components/VideosList/VideosListItem";

export type VideosListSize = "md" | "sm";

export interface VideosListProps {
  videos: youtube.VideosList;
  onVideoClick(videoId: string): void;
  size?: VideosListSize;
}

export function VideosList({
  videos,
  onVideoClick,
  size = "md",
}: VideosListProps) {
  return (
    <List $fontSize={size === "md" ? "1rem" : "0.8rem"} $margin="0 10px">
      {videos.map((video) => (
        <VideosListItem
          key={video.id.videoId}
          video={video}
          onClick={() => onVideoClick(video.id.videoId)}
          size={size}
        />
      ))}
    </List>
  );
}
