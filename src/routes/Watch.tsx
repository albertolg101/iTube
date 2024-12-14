import type * as youtube from "@/libs/youtube.d";
import React from "react";
import { useSearchParams } from "react-router";
import "@rmwc/circular-progress/styles";
import { Box, FlexBox, Grid } from "@/components/Theme";
import { useVideoDetails, useSearch } from "@/libs/youtube.ts";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { ErrorPage } from "@/components/ErrorPage";
import { VideosList } from "@/components/VideosList";
import { Header } from "@/components/Header";
import { SWRResponse } from "swr";
import { VideoDetails } from "@/components/VideoDetails";

export function Watch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = React.useRef<null | SWRResponse<youtube.VideosList>>(null);

  const videoId = searchParams.get("v");
  const query = searchParams.get("q") || "";

  const video = useVideoDetails(videoId || "404");
  const searchResponse = useSearch(query);

  let search = searchResponse;
  if (searchResponse.data !== undefined) {
    searchRef.current = searchResponse;
  } else if (searchRef.current !== null && searchResponse.error === undefined) {
    search = searchRef.current;
  }

  return video.error ? (
    <ErrorPage errorCode={500} />
  ) : video.data !== undefined && "status" in video.data ? (
    <ErrorPage errorCode={404} />
  ) : (
    videoId && (
      <FlexBox
        $direction="column"
        $width="100%"
        $fontSize="2rem"
        $padding="1rem 1rem 0 1rem"
        $height="100vh"
        $overflow="scroll"
      >
        <Header
          searchParams={{
            onSearch: (query) => setSearchParams({ v: videoId, q: query }),
            defaultValue: query,
            isLoading: searchResponse.isLoading,
          }}
        />
        <Grid
          $flexGrow
          $gridTemplateColumns="minmax(0, 1fr) auto"
          $margin="10px 30px 0 20px"
          $overflow="scroll"
          $scrollbarWidth="none"
        >
          <Box $padding="0 20px 10px 60px" $fontSize="1rem">
            <YouTubePlayer videoId={videoId} />
            <VideoDetails video={video} />
          </Box>
          <FlexBox $direction="column" $overflow="scroll">
            {query !== "" &&
              search !== undefined &&
              search.data !== undefined && (
                <VideosList
                  videos={search.data}
                  onVideoClick={(videoId) => {
                    setSearchParams({ v: videoId, q: query });
                  }}
                  size="sm"
                />
              )}
          </FlexBox>
        </Grid>
      </FlexBox>
    )
  );
}
