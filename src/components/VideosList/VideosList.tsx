import type * as youtube from "@/libs/youtube.d";
import { Typography } from "@/components/Theme";
import { Link } from "react-router";

export interface VideosListProps {
  videos: youtube.VideosList;
}

export function VideosList({ videos }: VideosListProps) {
  return (
    <ul>
      {videos.map((video) => (
        <li>
          <Link to={`/watch?v=${video.id.videoId}`}>
            <Typography as="a" $size="h5" $weight="medium">
              {video.title}
            </Typography>
          </Link>
        </li>
      ))}
    </ul>
  );
}
