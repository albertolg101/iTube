import React from "react";
import styled from "styled-components";
import Close from "@/assets/icons/close.svg?react";
import Edit from "@/assets/icons/edit.svg?react";
import DeleteForever from "@/assets/icons/delete_forever.svg?react";
import {
  addVideoToPlaylist,
  createPlaylist,
  destroyPlaylist,
  removeVideoFromPlaylist,
  updatePlaylist,
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
  playlists: ReturnType<typeof usePlaylists>;
};

export function AddVideoToPlaylistModal({
  video,
  isOpen,
  onClose,
  playlists,
}: PlaylistsModalProps) {
  const [playlistBeingRenamed, setPlaylistBeingRenamed] = React.useState<
    string | null
  >(null);
  const [newPlaylistName, setNewPlaylistName] = React.useState<string | null>(
    null,
  );
  const [playlistBeingUpdated, playlistBeingUpdatedReducer] = React.useReducer(
    (
      ids: string[],
      { type, payload }: { type: "add" | "remove"; payload: string },
    ) => {
      switch (type) {
        case "add":
          return [...ids, payload];
        case "remove":
          return ids.filter((id) => id !== payload);
      }
    },
    [],
  );
  const [playlistsBeingDestroyed, setPlaylistsBeingDestroyed] = React.useState<
    string[]
  >([]);
  const { register, unregister, handleSubmit } = useForm();

  function handleClose() {
    setPlaylistBeingRenamed(null);
    setNewPlaylistName(null);
    onClose();
  }

  async function onSubmit(data: Record<string, boolean>) {
    if (playlists.data !== undefined) {
      const awaits: Promise<unknown>[] = [];
      Object.entries(data).forEach(([playlistId, checked]) => {
        const videoId = video.videoId;
        const videos = playlists.data[playlistId].videos;
        if (checked && !(videoId in videos)) {
          awaits.push(addVideoToPlaylist(playlistId, video));
        } else if (!checked && videoId in videos) {
          awaits.push(removeVideoFromPlaylist(playlistId, video.videoId));
        }
      });

      Promise.all(awaits).then(() => playlists.mutate());
    } else {
      await playlists.mutate();
    }

    handleClose();
  }

  async function handleStartRenaming(playlistId: string, playlistName: string) {
    const oldPlaylistId = playlistBeingRenamed;
    const oldPlaylistNewName = newPlaylistName;

    setPlaylistBeingRenamed(playlistId);
    setNewPlaylistName(playlistName);

    if (
      oldPlaylistId !== null &&
      oldPlaylistNewName !== null &&
      oldPlaylistNewName !== ""
    ) {
      await handleUpdatePlaylist(oldPlaylistId, oldPlaylistNewName);
    }
  }

  async function handleEndRenaming(playlistId: string, playlistName: string) {
    setPlaylistBeingRenamed(null);
    setNewPlaylistName(null);
    await handleUpdatePlaylist(playlistId, playlistName);
  }

  async function handleUpdatePlaylist(playlistId: string, newName: string) {
    if (playlists.data !== undefined && newName !== "") {
      if (playlistId === "new") {
        await createPlaylist("iTube", newName);
        playlists.mutate();
      } else {
        playlistBeingUpdatedReducer({ type: "add", payload: playlistId });
        await updatePlaylist(playlistId, {
          ...playlists.data[playlistId],
          name: newName,
          videos: Object.values(playlists.data[playlistId].videos),
        });
        playlists.mutate();
        playlistBeingUpdatedReducer({ type: "remove", payload: playlistId });
      }
    }
  }

  async function handleDelete(playlistId: string) {
    setPlaylistsBeingDestroyed([...playlistsBeingDestroyed, playlistId]);
    if (playlistBeingRenamed === playlistId) {
      setPlaylistBeingRenamed(null);
      setNewPlaylistName(null);
    }
    await destroyPlaylist(playlistId);
    await playlists.mutate();
    setPlaylistsBeingDestroyed(
      playlistsBeingDestroyed.filter((id) => id !== playlistId),
    );
    unregister([playlistId]);
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
                  $gridTemplateColumns="auto 1fr auto auto"
                  $gridGap="10px"
                  $padding="0 20px 0 10px"
                  $overflow="hidden scroll"
                >
                  {Object.values(playlists.data).map((playlist) => (
                    <React.Fragment key={playlist.id}>
                      {playlistBeingUpdated.includes(playlist.id) ? (
                        <CircularProgress size="small" />
                      ) : playlistBeingRenamed === playlist.id ? (
                        <div />
                      ) : (
                        <IconButton
                          type="button"
                          onClick={handleStartRenaming.bind(
                            null,
                            playlist.id,
                            playlist.name,
                          )}
                        >
                          <Edit fill="currentColor" />
                        </IconButton>
                      )}
                      {playlistBeingRenamed === playlist.id &&
                      newPlaylistName !== null ? (
                        <Input
                          type="text"
                          autoFocus
                          value={newPlaylistName}
                          onChange={(e) => setNewPlaylistName(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            handleEndRenaming(playlist.id, newPlaylistName)
                          }
                        />
                      ) : (
                        <label htmlFor={playlist.id}>
                          <Typography as="p">{playlist.name}</Typography>
                        </label>
                      )}
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
                  {playlistBeingRenamed === "new" &&
                    newPlaylistName !== null && (
                      <Box $gridColumn="2">
                        <Input
                          type="text"
                          autoFocus
                          value={newPlaylistName}
                          onChange={(e) => setNewPlaylistName(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            handleEndRenaming("new", newPlaylistName)
                          }
                        />
                      </Box>
                    )}
                </Grid>
                <FlexBox $margin="15px 0" $direction="column" $gap="10px">
                  {playlistBeingRenamed !== "new" && (
                    <Button
                      type="button"
                      $variant="contained"
                      onClick={handleStartRenaming.bind(null, "new", "")}
                    >
                      Add new playlist
                    </Button>
                  )}
                  {playlistBeingRenamed !== null &&
                    newPlaylistName !== null && (
                      <FlexBox $direction="row" $gap="10px">
                        <Button
                          type="button"
                          $variant="outlined"
                          onClick={() => {
                            setPlaylistBeingRenamed(null);
                            setNewPlaylistName(null);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          $variant="contained"
                          disabled={newPlaylistName === ""}
                          onClick={handleEndRenaming.bind(
                            null,
                            playlistBeingRenamed,
                            newPlaylistName,
                          )}
                        >
                          Save
                        </Button>
                      </FlexBox>
                    )}
                </FlexBox>
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
            disabled={playlistBeingRenamed !== null}
          >
            Accept
          </Button>
        </FlexBox>
      </FlexBox>
    </Overlay>
  );
}
