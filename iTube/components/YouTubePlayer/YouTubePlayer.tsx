import type * as youtube from "@/hooks/youtube";
import styled from "styled-components";
import { Box } from "@/components/Theme";

const IFrame = styled(Box).attrs({ as: "iframe" })`
  border: none;
`;

export interface YouTubePlayerProps {
  videoId: youtube.SearchResultItem["id"]["videoId"];
}

export function YouTubePlayer({ videoId }: YouTubePlayerProps) {
  const iFrameSrc = `https://www.youtube.com/embed/${videoId}`;
  const queryParams = new URLSearchParams({ autoplay: "1" });

  return (
    <Box
      $position="relative"
      $width="100%"
      $height="0"
      $padding={`${(9 / 16) * 100}% 0 0 0`}
      $overflow="hidden"
      $borderRadius="12px"
    >
      <IFrame
        id="ytplayer"
        width="640"
        height="360"
        src={iFrameSrc + "?" + queryParams.toString()}
        $position="absolute"
        $top="0"
        $width="100%"
        $height="100%"
      ></IFrame>
    </Box>
  );
}
