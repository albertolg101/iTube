import type * as youtube from "@/hooks/youtube";
import React from "react";
import { useSearchParams } from "react-router";
import "@rmwc/circular-progress/styles";
import { Box, FlexBox, Grid } from "@/components/Theme";
import { useVideo, useSearch } from "@/hooks/youtube";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { ErrorPage } from "@/components/ErrorPage";
import { VideosList } from "@/components/VideosList";
import { Header } from "@/components/Header";
import { SWRResponse } from "swr";
import { VideoDetails } from "@/components/VideoDetails";

export function Watch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = React.useRef<null | SWRResponse<youtube.SearchResult>>(
    null,
  );

  const videoId = searchParams.get("v");
  const query = searchParams.get("q") || "";

  const video = useVideo(videoId || "404");
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
        $height="100%"
        $fontSize="2rem"
        $padding="1rem 1rem 0 1rem"
        $overflow="hidden"
      >
        <Header
          searchParams={{
            onSearch: (query) => setSearchParams({ v: videoId, q: query }),
            defaultValue: query,
            isLoading: searchResponse.isLoading,
          }}
        />
        <Grid
          $gridTemplateColumns="minmax(0, 1fr) auto"
          $margin="10px 30px 0 20px"
          $height="100%"
          $overflow="hidden"
        >
          <Box
            $padding="0 20px 10px 60px"
            $overflow="hidden auto"
            $fontSize="1rem"
          >
            <YouTubePlayer videoId={videoId} />
            <VideoDetails videoId={videoId} video={video} />
          </Box>
          <FlexBox $direction="column" $overflow="hidden auto">
            {query !== "" &&
              search !== undefined &&
              search.data !== undefined && (
                <VideosList
                  videos={search.data}
                  getVideoUrl={(videoId) => `/watch?v=${videoId}&q=${query}`}
                  size="sm"
                />
              )}
          </FlexBox>
        </Grid>
      </FlexBox>
    )
  );
}
