import type * as youtube from "@/hooks/youtube";
import React from "react";
import { SWRResponse } from "swr";
import styled from "styled-components";
import { Box, Button, FlexBox, Typography } from "@/components/Theme";
import { CustomTheme } from "@/CustomTheme";
import { numberToShortFormat, toTimeAgoString } from "@/hooks/youtube";
import { AddVideoToPlaylistModal } from "@/components/PlaylistsModal/AddVideoToPlaylistModal.tsx";

const DescriptionBox = styled(Box)`
  margin: 10px 0 10px 10px;
  padding: 1px 20px;
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.palette.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.palette.primary.dark};
  }
`;

export interface VideoDetailsProps {
  videoId: string;
  video: SWRResponse<youtube.Video | youtube.ErrorResponse>;
}

export function VideoDetails({ videoId, video }: VideoDetailsProps) {
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] =
    React.useState<boolean>(false);
  const [showShortDescription, toggleShowShortDescription] = React.useReducer(
    (v) => !v,
    true,
  );
  const touchStartTime = React.useRef<Date>();

  function handleDescriptionTouchStart() {
    touchStartTime.current = new Date();
  }

  function handleDescriptionTouchEnd() {
    if (touchStartTime.current !== undefined) {
      const touchEndTime = new Date();
      const duration =
        touchEndTime.getTime() - touchStartTime.current.getTime();
      if (duration < 500) {
        toggleShowShortDescription();
      }
    }
  }

  return video.isLoading ? (
    <>
      <Box
        key="loading-title"
        animate={{ opacity: [0.6, 0.2, 0.6] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        $height={CustomTheme.font.sizes.h4}
        $width="40rem"
        $background="gray"
        $backgroundSize={`300% 300%`}
        $margin="1rem 0 0 0"
        $borderRadius="5px"
      />
      <Box
        key="loading-owner"
        animate={{ opacity: [0.6, 0.2, 0.6] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        $height={CustomTheme.font.sizes.h6}
        $width="20rem"
        $background="gray"
        $margin={CustomTheme.font.margin.h6}
        $borderRadius="5px"
      />
    </>
  ) : (
    video.data !== undefined && !("status" in video.data) && (
      <>
        <FlexBox $gap="15px" $margin="10px 0">
          <Box>
            <Typography as="h1" $size="h4" $weight="bold">
              {video.data.title}
            </Typography>
            <Typography as="h2" $size="h6" $weight="medium">
              {video.data.owner}
            </Typography>
          </Box>
          <Box $margin="10px 0 0 0">
            <Button
              $variant="contained"
              onClick={() => setShowAddToPlaylistModal(true)}
            >
              <Typography as="span" $size="button" $weight="medium">
                Add to playlist
              </Typography>
            </Button>
          </Box>
        </FlexBox>
        <DescriptionBox
          onPointerDown={handleDescriptionTouchStart}
          onPointerUp={handleDescriptionTouchEnd}
        >
          <Typography as="p" $margin="1rem 0" $weight="medium">
            <Typography as="span" $size="subtitle1" $weight="bold">
              {`${numberToShortFormat(video.data.views)} views`}
              {" • "}
              {toTimeAgoString(video.data.datePublished)}
              <br />
              {video.data.genre}
            </Typography>
            <br />
            <Typography as="p" $whiteSpace="pre-wrap">
              {showShortDescription
                ? video.data.shortDescription
                : video.data.description}
            </Typography>
          </Typography>
        </DescriptionBox>
        <AddVideoToPlaylistModal
          isOpen={showAddToPlaylistModal}
          onClose={() => setShowAddToPlaylistModal(false)}
          video={{
            videoId: videoId,
            thumbnailUrl: video.data.thumbnailUrl,
            duration: video.data.duration,
            title: video.data.title,
            views: video.data.views,
            publishedAt: toTimeAgoString(video.data.datePublished),
            owner: video.data.owner,
            shortDescription: video.data.shortDescription,
          }}
        />
      </>
    )
  );
}
