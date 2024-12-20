import type { VideosListSize } from "@/components/VideosList/VideosList.tsx";
import { FlexBox, ListItem, Typography } from "@/components/Theme";
import { CustomTheme } from "@/CustomTheme";
import {
  Thumbnail,
  ThumbnailProps,
} from "@/components/VideosList/Thumbnail.tsx";
import { numberToShortFormat } from "@/hooks/youtube";
import { Link } from "react-router";

export interface VideosListItemProps {
  video: {
    title: string;
    views: string;
    publishedAt: string;
    owner: string;
    shortDescription: string;
  } & ThumbnailProps["video"];
  size: VideosListSize;
  toUrl: string;
}

export function VideosListItem({ video, toUrl, size }: VideosListItemProps) {
  return (
    <ListItem $margin="0 0 0.6em 0">
      <FlexBox $direction="row" $gap="0.6em">
        <Link to={toUrl}>
          <Thumbnail video={video} size={size} />
        </Link>
        <Link to={toUrl}>
          <FlexBox
            $direction="column"
            $width={size === "md" ? "30em" : "15em"}
            $alignItems="start"
          >
            <Typography as="h5" $weight="medium" $maxLines={3}>
              {video.title}
            </Typography>
            <Typography
              as="p"
              $size="subtitle1"
              $color={CustomTheme.palette.text.secondary}
            >
              {numberToShortFormat(parseInt(video.views))}
              {" - "}
              {video.publishedAt}
            </Typography>
            <Typography
              as="p"
              $size="subtitle1"
              $weight="medium"
              $margin="0.6em 0"
            >
              {video.owner}
            </Typography>
            {size === "md" && (
              <Typography as="p" $size="subtitle1" $margin="0.6em 0">
                {video.shortDescription}
              </Typography>
            )}
          </FlexBox>
        </Link>
      </FlexBox>
    </ListItem>
  );
}
