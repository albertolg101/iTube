import { List } from "@/components/Theme";
import {
  VideosListItem,
  VideosListItemProps,
} from "@/components/VideosList/VideosListItem";

export type VideosListSize = "md" | "sm" | "xsm";

export interface VideosListProps {
  videos: (VideosListItemProps["video"] & {
    id: string;
  })[];
  getVideoUrl(videoId: string, index: number): string;
  size?: VideosListSize;
}

export function VideosList({
  videos,
  getVideoUrl,
  size = "md",
}: VideosListProps) {
  return (
    <List
      $fontSize={size === "md" ? "1rem" : size === "sm" ? "0.8rem" : "0.7rem"}
      $margin="0 10px"
    >
      {videos.map((video, index) => (
        <VideosListItem
          key={video.id}
          video={video}
          toUrl={getVideoUrl(video.id, index)}
          size={size}
        />
      ))}
    </List>
  );
}
