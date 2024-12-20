import type * as youtube from "@/hooks/youtube";
import type { PlaylistsListSize } from "@/components/PlaylistsList/PlaylistsList.tsx";
import { Box, FlexBox, Img, Typography } from "@/components/Theme";

export interface ThumbnailProps {
  playlist: youtube.Playlist;
  size: PlaylistsListSize;
}

export function Thumbnail({ playlist, size }: ThumbnailProps) {
  const videos = Object.values(playlist.videos);
  const thumbnailUrl = videos[0]?.thumbnailUrl;

  return (
    <Box
      $width={size === "md" ? "20em" : "15em"}
      $borderRadius="12px"
      $overflow="hidden"
    >
      <Box
        $position="relative"
        $background="gray"
        $padding={`${(9 / 16) * 100}% 0 0 0`}
      >
        {thumbnailUrl && (
          <Img
            src={thumbnailUrl}
            alt={playlist.name}
            width="100%"
            height="100%"
            $position="absolute"
            $top="0"
            $left="0"
            $objectFit="cover"
          />
        )}
        <FlexBox
          $position="absolute"
          $background="rgba(50, 50, 50, 0.5)"
          $top="0"
          $bottom="0"
          $left="0"
          $right="0"
          $centered
        >
          <Box
            $background="rgba(10, 10, 10, 0.9)"
            $padding="0.2em 0.4em"
            $borderRadius="12px"
          >
            <Typography $color="white" $size="h3" $margin="0">
              {videos.length} video{videos.length > 1 ? "s" : ""}
            </Typography>
          </Box>
        </FlexBox>
      </Box>
    </Box>
  );
}
