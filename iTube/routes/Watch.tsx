import type * as youtube from "@/hooks/youtube";
import React from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router";
import "@rmwc/circular-progress/styles";
import { Box, FlexBox, Grid, Typography } from "@/components/Theme";
import {
  useVideo,
  useSearch,
  usePlaylists,
  usePlaylist,
  toTime,
} from "@/hooks/youtube";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { ErrorPage } from "@/components/ErrorPage";
import { VideosList } from "@/components/VideosList";
import { Header } from "@/components/Header";
import { SWRResponse } from "swr";
import { VideoDetails } from "@/components/VideoDetails";
import ArrowDropDown from "@/assets/icons/arrow_drop_down.svg";
import { PlaylistsList } from "@/components/PlaylistsList";
import { CustomTheme } from "@/CustomTheme.ts";

const Select = styled.select`
  font-size: 0.5em;
  margin: 0 10px 10px 10px;
  padding: 8px 20px 8px 10px;
  border: none;
  border-radius: 2em;
  appearance: none;
  background-color: ${({ theme }) => theme.palette.primary.main};
  background-image: url("${ArrowDropDown}");
  background-repeat: no-repeat;
  background-position: right center;
  outline: none;
`;

export function Watch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = React.useRef<null | SWRResponse<youtube.SearchResult>>(
    null,
  );
  const [selectValue, setSelectValue] = React.useState<string>("video");
  const youtubePlayerRef = React.useRef<null | HTMLDivElement>(null);

  const v = searchParams.get("v");
  const i = searchParams.get("i");
  const query = searchParams.get("q") || "";

  let playlistId: string | null = null;
  if (v !== null && v.length > 11) {
    playlistId = v;
  }
  const playlist = usePlaylist(playlistId || "404");

  let index = parseInt(i || "0");
  if (isNaN(index)) {
    index = 0;
  }

  let videoId: string | null = null;
  if (v !== null && v.length === 11) {
    videoId = v;
  } else if (playlist.data !== undefined && "id" in playlist.data) {
    index = Math.min(index, Object.values(playlist.data.videos).length - 1);
    videoId = Object.values(playlist.data.videos)[index]?.videoId;
  }
  const video = useVideo(videoId || "404");

  const searchResponse = useSearch(query);
  const playlists = usePlaylists("iTube");

  let search = searchResponse;
  if (searchResponse.data !== undefined) {
    searchRef.current = searchResponse;
  } else if (searchRef.current !== null && searchResponse.error === undefined) {
    search = searchRef.current;
  }

  function handleOnPlayerEnd() {
    let nextV = null;
    let nextI = null;

    if (playlist.data !== undefined && "id" in playlist.data) {
      const videos = Object.values(playlist.data.videos);
      if (index + 1 < videos.length) {
        nextV = playlist.data.id;
        nextI = index + 1;
      }
    }

    if (nextV === null && search.data !== undefined) {
      if (search.data.length === 1) {
        nextV = search.data[0].id.videoId;
      } else {
        while (nextV === null || nextV === videoId) {
          const nextIndex = Math.floor(Math.random() * search.data.length);
          nextV = search.data[nextIndex].id.videoId;
        }
      }
    }

    if (nextV !== null) {
      const searchParams = new URLSearchParams({ v: nextV });
      if (nextI !== null) {
        searchParams.set("i", nextI.toString());
      }
      if (query !== "") {
        searchParams.set("q", query);
      }
      setSearchParams(searchParams);
    }
  }

  return video.error || playlist.error ? (
    <ErrorPage errorCode={500} />
  ) : video.data !== undefined &&
    "status" in video.data &&
    playlist.data !== undefined &&
    "success" in playlist.data ? (
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
            onSearch: (query) => {
              const searchParams = new URLSearchParams({ q: query });
              if (v !== null) {
                searchParams.set("v", v);
              }
              if (i !== null) {
                searchParams.set("i", i);
              }
              setSearchParams(searchParams);
              setSelectValue("video");
            },
            defaultValue: query,
            isLoading: searchResponse.isLoading,
          }}
        />
        <Grid
          $gridTemplateColumns="1fr 13em"
          $margin="10px 30px 0 20px"
          $height="100%"
          $overflow="hidden"
        >
          <Box
            $padding="0 20px 10px 60px"
            $overflow="hidden auto"
            $fontSize="1rem"
          >
            <YouTubePlayer
              ref={youtubePlayerRef}
              videoId={videoId}
              onEnd={handleOnPlayerEnd}
            />
            <VideoDetails videoId={videoId} video={video} />
          </Box>
          <Box $overflow="hidden auto">
            {playlistId &&
              playlist.data !== undefined &&
              "id" in playlist.data && (
                <Box
                  $background={CustomTheme.palette.background.primary}
                  $padding="0.5em"
                  $border={`solid 1px ${CustomTheme.palette.background.secondary}`}
                  $borderRadius="12px"
                  $maxHeight={
                    youtubePlayerRef.current
                      ? `${youtubePlayerRef.current.scrollHeight}px`
                      : "18em"
                  }
                  $overflow="scroll"
                >
                  <Typography as="h4" $size="h6" $margin="0.3em">
                    {playlist.data.name}:
                  </Typography>
                  <hr />
                  <VideosList
                    videos={Object.values(playlist.data.videos).map(
                      (video) => ({
                        id: video.videoId,
                        title: video.title,
                        thumbnailUrl: video.thumbnailUrl,
                        views: video.views.toString(),
                        duration: toTime(video.duration),
                        owner: video.owner,
                        publishedAt: video.publishedAt,
                        shortDescription: video.shortDescription,
                      }),
                    )}
                    getVideoUrl={(_, index) =>
                      `/watch?v=${playlistId}&i=${index}&q=${query}`
                    }
                    size="xsm"
                  />
                </Box>
              )}
            <Select
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
            >
              <option value="video">Videos</option>
              <option value="playlist">Playlists</option>
            </Select>
            <FlexBox $direction="column">
              {selectValue === "video"
                ? query !== "" &&
                  search !== undefined &&
                  search.data !== undefined && (
                    <VideosList
                      videos={search.data.map((video) => ({
                        id: video.id.videoId,
                        title: video.snippet.title,
                        thumbnailUrl: video.snippet.thumbnails.url,
                        views: video.snippet.views,
                        duration: video.snippet.duration,
                        owner: video.channelName,
                        publishedAt: video.snippet.publishedAt,
                        shortDescription: video.description,
                      }))}
                      getVideoUrl={(videoId) =>
                        `/watch?v=${videoId}&q=${query}`
                      }
                      size="sm"
                    />
                  )
                : playlists.data !== undefined && (
                    <PlaylistsList
                      playlists={playlists.data}
                      getPlaylistUrl={(playlistId) => {
                        const searchParams = new URLSearchParams({
                          v: playlistId,
                          i: "0",
                        });
                        if (query !== "") {
                          searchParams.set("q", query);
                        }
                        return `/watch?${searchParams}`;
                      }}
                      size="sm"
                    />
                  )}
            </FlexBox>
          </Box>
        </Grid>
      </FlexBox>
    )
  );
}
