import React from "react";
import styled from "styled-components";
import Close from "@/assets/icons/close.svg?react";
import DeleteForever from "@/assets/icons/delete_forever.svg?react";
import {
  addVideoToPlaylist,
  createPlaylist,
  destroyPlaylist,
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

const Input = styled.input`
  font-size: ${({ theme }) => theme.font.sizes.h6};
`;

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
  const [newPlaylistName, setNewPlaylistName] = React.useState<string | null>(
    null,
  );
  const [playlistsBeingDestroyed, setPlaylistsBeingDestroyed] = React.useState<
    string[]
  >([]);
  const { register, handleSubmit } = useForm();

  function handleClose() {
    setNewPlaylistName(null);
    onClose();
  }

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

    handleClose();
  }

  async function handleCreateNewPlaylist() {
    if (newPlaylistName !== null && newPlaylistName !== "") {
      await createPlaylist("iTube", newPlaylistName);
      setNewPlaylistName(null);
      playlists.mutate();
    }
  }

  async function handleDelete(playlistId: string) {
    setPlaylistsBeingDestroyed([...playlistsBeingDestroyed, playlistId]);
    await destroyPlaylist(playlistId);
    playlists.mutate();
    setPlaylistsBeingDestroyed(
      playlistsBeingDestroyed.filter((id) => id !== playlistId),
    );
  }

  return (
    <Overlay isOpen={isOpen} onClose={handleClose}>
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
          <IconButton type="button" onClick={handleClose}>
            <Close fill="currentColor" />
          </IconButton>
        </Grid>
        <FlexBox
          $flexGrow
          $direction="column"
          $padding="10px 0 0 0"
          $overflow="hidden"
        >
          {playlists.isLoading ? (
            <FlexBox $centered $height="100%">
              <CircularProgress size="large" />
            </FlexBox>
          ) : (
            playlists.data !== undefined && (
              <>
                <Grid
                  $gridTemplateColumns="1fr auto auto"
                  $gridGap="10px"
                  $padding="0 20px 0 10px"
                  $overflow="hidden scroll"
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
                      {playlistsBeingDestroyed.includes(playlist.id) ? (
                        <CircularProgress size="small" />
                      ) : (
                        <IconButton
                          type="button"
                          onClick={() => handleDelete(playlist.id)}
                        >
                          <DeleteForever fill="currentColor" />
                        </IconButton>
                      )}
                    </React.Fragment>
                  ))}
                  {newPlaylistName !== null && (
                    <Input
                      type="text"
                      autoFocus
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                    />
                  )}
                </Grid>
                <Box $margin="15px 0">
                  {newPlaylistName === null ? (
                    <Button
                      type="button"
                      $variant="contained"
                      onClick={setNewPlaylistName.bind(null, "")}
                    >
                      Add new playlist
                    </Button>
                  ) : (
                    <FlexBox $direction="row" $gap="10px">
                      <Button
                        type="button"
                        $variant="outlined"
                        onClick={setNewPlaylistName.bind(null, null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        $variant="contained"
                        disabled={newPlaylistName === ""}
                        onClick={handleCreateNewPlaylist}
                      >
                        Save
                      </Button>
                    </FlexBox>
                  )}
                </Box>
              </>
            )
          )}
        </FlexBox>
        <FlexBox $width="100%" $justifyContent="end" $gap="10px">
          <Button type="button" $variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            $variant="contained"
            disabled={newPlaylistName !== null}
          >
            Accept
          </Button>
        </FlexBox>
      </FlexBox>
    </Overlay>
  );
}
