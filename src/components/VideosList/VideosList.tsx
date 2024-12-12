import type * as youtube from "@/libs/youtube.d";
import { Typography } from "@/components/Theme";

export interface VideosListProps {
  videos: youtube.VideosList;
}

export function VideosList({ videos }: VideosListProps) {
  return (
    <ul>
      {videos.map((video) => (
        <li>
          <Typography as="h1" $size="h5" $weight="medium">
            {video.title}
          </Typography>
        </li>
      ))}
    </ul>
  );
}
