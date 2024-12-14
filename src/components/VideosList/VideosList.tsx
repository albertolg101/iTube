import type * as youtube from "@/libs/youtube.d";
import { VideosListItem } from "@/components/VideosListItem";
import { List } from "@/components/Theme";

type VideosListVariant = "normal" | "mini";

export interface VideosListProps {
  videos: youtube.VideosList;
  onVideoClick(videoId: string): void;
  variant?: VideosListVariant;
}

export function VideosList({
  videos,
  onVideoClick,
  variant = "normal",
}: VideosListProps) {
  return (
    <List $fontSize="1rem">
      {videos.map((video) => (
        <VideosListItem
          key={video.id.videoId}
          video={video}
          onClick={() => onVideoClick(video.id.videoId)}
        />
      ))}
    </List>
  );
}
