import type * as youtube from "@/libs/youtube.d";
import {
  Box,
  FlexBox,
  IconButton,
  Img,
  ListItem,
  Typography,
} from "@/components/Theme";
import { CustomTheme } from "@/libs/CustomTheme.ts";

const THUMBNAIL_WIDTH = 320;

function Thumbnail({ video }: { video: youtube.VideosListItem }) {
  return (
    <Box
      $position="relative"
      $width={`${THUMBNAIL_WIDTH}px`}
      $height={`${(THUMBNAIL_WIDTH * 9) / 16}px`}
      $borderRadius="12px"
      $overflow="hidden"
    >
      <Img
        src={video.snippet.thumbnails.url}
        alt={video.snippet.title}
        width="100%"
        height="100%"
        $objectFit="cover"
      />
      <Box
        $position="absolute"
        $bottom="10px"
        $right="10px"
        $padding="0.5px 3px"
        $backgroundColor="rgba(0, 0, 0, 0.6)"
        $borderRadius="4px"
        style={{ pointerEvents: "none" }}
      >
        <Typography as="p" $size="subtitle1" $color="white">
          {video.snippet.duration}
        </Typography>
      </Box>
    </Box>
  );
}

interface VideosListItemProps {
  video: youtube.VideosListItem;
  onClick: () => void;
}

export function VideosListItem({ video, onClick }: VideosListItemProps) {
  function numberToShortFormat(num: number): string {
    if (num >= 1_000_000_000) {
      return `${(num / 1_000_000_000).toFixed(1)} B`;
    } else if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)} M`;
    } else if (num >= 1_000) {
      return `${(num / 1_000).toFixed(1)} K`;
    }
    return num.toString();
  }

  return (
    <ListItem $margin="10px">
      <FlexBox $direction="row" $gap="10px">
        <IconButton onClick={onClick}>
          <Thumbnail video={video} />
        </IconButton>
        <IconButton onClick={onClick} $userSelect="text">
          <FlexBox $direction="column" $width="30em" $alignItems="start">
            <Typography as="h5" $weight="medium">
              {video.title}
            </Typography>
            <Typography
              as="p"
              $size="subtitle1"
              $color={CustomTheme.palette.text.secondary}
            >
              {numberToShortFormat(parseInt(video.snippet.views))}
              {" - "}
              {video.snippet.publishedAt}
            </Typography>
            <Typography
              as="p"
              $size="subtitle1"
              $weight="medium"
              $margin="10px 0"
            >
              {video.channelName}
            </Typography>
            <Typography as="p" $size="subtitle1" $margin="10px 0">
              {video.description}
            </Typography>
          </FlexBox>
        </IconButton>
      </FlexBox>
    </ListItem>
  );
}
