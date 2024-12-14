import type * as youtube from "@/libs/youtube.d";
import React from "react";
import { useSearchParams } from "react-router";
import "@rmwc/circular-progress/styles";
import { Box, FlexBox, Grid, Typography } from "@/components/Theme";
import {
  useVideoDetails,
  useSearch,
  numberToShortFormat,
  toTimeAgoString,
} from "@/libs/youtube.ts";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { ErrorPage } from "@/components/ErrorPage";
import { VideosList } from "@/components/VideosList";
import { Header } from "@/components/Header";
import { CustomTheme } from "@/libs/CustomTheme.ts";
import { SWRResponse } from "swr";

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
            {video.data !== undefined && (
              <>
                <Typography
                  as="h1"
                  $size="h4"
                  $weight="bold"
                  $margin="1rem 0 0 0"
                >
                  {video.data.title}
                </Typography>
                <Typography as="h2" $size="h6" $weight="medium">
                  {video.data.owner}
                </Typography>
                <Box
                  $margin="10px 0 10px 10px"
                  $padding="1px 20px"
                  // $background={`linear-gradient(45deg, ${CustomTheme.palette.primary.light} 0%, ${CustomTheme.palette.primary.dark} 100%)`}
                  $background={CustomTheme.palette.primary.main}
                  $borderRadius="12px"
                >
                  <Typography as="p"></Typography>
                  <Typography as="p" $margin="1rem 0" $weight="medium">
                    <Typography as="span" $size="subtitle1" $weight="bold">
                      {`${numberToShortFormat(video.data.views)} views`}
                      {" • "}
                      {toTimeAgoString(video.data.datePublished)}
                      <br />
                      {video.data.genre}
                    </Typography>
                    <br />
                    {video.data.description}
                  </Typography>
                </Box>
              </>
            )}
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
