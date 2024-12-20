import type { VideosListSize } from "@/components/VideosList/VideosList.tsx";
import { Box, Img, Typography } from "@/components/Theme";

export interface ThumbnailProps {
  video: {
    title: string;
    thumbnailUrl: string;
    duration: string;
  };
  size: VideosListSize;
}

export function Thumbnail({ video, size }: ThumbnailProps) {
  return (
    <Box
      $width={size === "md" ? "20em" : "15em"}
      $borderRadius="12px"
      $overflow="hidden"
    >
      <Box $position="relative" $padding={`${(9 / 16) * 100}% 0 0 0`}>
        <Img
          src={video.thumbnailUrl}
          alt={video.title}
          width="100%"
          height="100%"
          $position="absolute"
          $top="0"
          $left="0"
          $objectFit="cover"
        />
        <Box
          $position="absolute"
          $bottom="0.6em"
          $right="0.6em"
          $padding="0.5px 3px"
          $background="rgba(0, 0, 0, 0.6)"
          $borderRadius="4px"
          style={{ pointerEvents: "none" }}
        >
          <Typography as="p" $size="subtitle1" $color="white">
            {video.duration}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
