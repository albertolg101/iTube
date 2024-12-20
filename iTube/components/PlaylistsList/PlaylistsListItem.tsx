import type * as youtube from "@/hooks/youtube";
import type { PlaylistsListSize } from "@/components/PlaylistsList/PlaylistsList.tsx";
import { FlexBox, List, ListItem, Typography } from "@/components/Theme";
import { Thumbnail } from "@/components/PlaylistsList/Thumbnail.tsx";
import { Link } from "react-router";

interface PlaylistsListItemProps {
  playlist: youtube.Playlist;
  size: PlaylistsListSize;
  toUrl: string;
}

export function PlaylistsListItem({
  playlist,
  size,
  toUrl,
}: PlaylistsListItemProps) {
  return (
    <ListItem $margin="0 0 0.6em 0">
      <FlexBox $direction="row" $gap="0.6em">
        <Link to={toUrl}>
          <Thumbnail playlist={playlist} size={size} />
        </Link>
        <Link to={toUrl}>
          <FlexBox
            $direction="column"
            $width={size === "md" ? "30em" : "15em"}
            $alignItems="start"
          >
            <Typography as="h5" $weight="medium" $maxLines={3}>
              {playlist.name}
            </Typography>
            <List $padding="0 1em">
              {Object.values(playlist.videos)
                .slice(0, 3)
                .map((video) => (
                  <ListItem
                    key={video.videoId}
                    $listStyleType="circle"
                    $color="black"
                  >
                    <Typography
                      as="p"
                      $size="subtitle1"
                      $margin="0.3em 0"
                      $maxLines={1}
                    >
                      {video.title}
                    </Typography>
                  </ListItem>
                ))}
              {Object.values(playlist.videos).length > 4 && (
                <ListItem $listStyleType="circle" $color="black">
                  <Typography as="p" $size="subtitle1" $margin="0.3em 0">
                    and {Object.values(playlist.videos).length - 4} more...
                  </Typography>
                </ListItem>
              )}
            </List>
          </FlexBox>
        </Link>
      </FlexBox>
    </ListItem>
  );
}
