import React from "react";
import Close from "@/assets/icons/close.svg?react";
import {
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  usePlaylists,
} from "@/hooks/youtube";
import {
  Box,
  Button,
  FlexBox,
  Grid,
  IconButton,
  Overlay,
  Typography,
} from "@/components/Theme";
import { CircularProgress } from "@rmwc/circular-progress";
import { CustomTheme } from "@/CustomTheme";
import { useForm } from "react-hook-form";
import { PlaylistVideo } from "@/hooks/youtube/types";

export type PlaylistsModalProps = {
  video: PlaylistVideo;
  isOpen: boolean;
  onClose: () => void;
};

export function AddVideoToPlaylistModal({
  video,
  isOpen,
  onClose,
}: PlaylistsModalProps) {
  const playlists = usePlaylists("iTube");
  const { register, handleSubmit } = useForm();

  async function onSubmit(data: Record<string, boolean>) {
    if (playlists.data !== undefined) {
      Object.entries(data).forEach(([playlistId, checked]) => {
        const videoId = video.videoId;
        const videos = playlists.data[playlistId].videos;
        if (checked && !(videoId in videos)) {
          addVideoToPlaylist(playlistId, video);
        } else if (!checked && videoId in videos) {
          removeVideoFromPlaylist(playlistId, video.videoId);
        }
      });
    }

    onClose();
  }

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <FlexBox
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        $direction="column"
        $background={CustomTheme.palette.background.primary}
        $borderRadius="15px"
        $padding="1em 1.5em"
        $width="400px"
        $height="600px"
      >
        <Grid $gridTemplateColumns="1fr auto">
          <Typography as="h3" $size="h4" $weight="medium">
            Add video to:
          </Typography>
          <IconButton type="button" onClick={onClose}>
            <Close fill="currentColor" />
          </IconButton>
        </Grid>
        <Box $flexGrow $padding="10px 0 0 0">
          {playlists.isLoading ? (
            <FlexBox $centered $height="100%">
              <CircularProgress size="large" />
            </FlexBox>
          ) : (
            playlists.data !== undefined && (
              <Grid
                $gridTemplateColumns="1fr auto"
                $gridGap="10px"
                $padding="0 0 0 10px"
              >
                {Object.values(playlists.data).map((playlist) => (
                  <React.Fragment key={playlist.id}>
                    <label htmlFor={playlist.id}>
                      <Typography as="p">{playlist.name}</Typography>
                    </label>
                    <input
                      id={playlist.id}
                      type="checkbox"
                      defaultChecked={video.videoId in playlist.videos}
                      {...register(playlist.id)}
                    />
                  </React.Fragment>
                ))}
              </Grid>
            )
          )}
        </Box>
        <FlexBox $width="100%" $justifyContent="end" $gap="10px">
          <Button type="button" $variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" $variant="contained">
            Accept
          </Button>
        </FlexBox>
      </FlexBox>
    </Overlay>
  );
}
