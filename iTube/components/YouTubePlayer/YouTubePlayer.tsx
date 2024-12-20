import type * as youtube from "@/hooks/youtube";
import React from "react";
import styled from "styled-components";
import { Box } from "@/components/Theme";
import YouTube from "react-youtube";

const StyledYouTube = styled(YouTube)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export interface YouTubePlayerProps {
  videoId: youtube.SearchResultItem["id"]["videoId"];
  onEnd?: () => void;
}

function _YouTubePlayer(
  { videoId, onEnd }: YouTubePlayerProps,
  ref: React.Ref<HTMLDivElement>,
) {
  // const iFrameSrc = `https://www.youtube.com/embed/${videoId}`;
  // const queryParams = new URLSearchParams({ autoplay: "1" });

  return (
    <Box
      ref={ref}
      $position="relative"
      $width="100%"
      $height="0"
      $padding={`${(9 / 16) * 100}% 0 0 0`}
      $overflow="hidden"
      $borderRadius="12px"
    >
      <StyledYouTube
        videoId={videoId}
        opts={{
          height: "100%",
          width: "100%",
          playerVars: {
            autoplay: 1,
          },
        }}
        onEnd={onEnd}
      />
    </Box>
  );
}

export const YouTubePlayer = React.forwardRef(_YouTubePlayer);
