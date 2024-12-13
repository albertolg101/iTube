import { useSearchParams } from "react-router";
import "@rmwc/circular-progress/styles";
import { CircularProgress } from "@rmwc/circular-progress";
import { FlexBox } from "@/components/Theme";
import { useVideoDetails, useSearch } from "@/libs/youtube.ts";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { ErrorPage } from "@/components/ErrorPage";
import { SearchBar } from "@/components/SearchBar";
import { VideosList } from "@/components/VideosList";

export function Watch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const videoId = searchParams.get("v");
  const query = searchParams.get("q") || "";

  const video = useVideoDetails(videoId || "404");
  const search = useSearch(query);

  return video.error ? (
    <ErrorPage errorCode={500} />
  ) : video.data !== undefined && "status" in video.data ? (
    <ErrorPage errorCode={404} />
  ) : video.isLoading ? (
    <FlexBox $centered $flexGrow>
      <CircularProgress size="xlarge" />
    </FlexBox>
  ) : (
    videoId &&
    video.data && (
      <FlexBox>
        <YouTubePlayer videoId={videoId} />
        <FlexBox $direction="column">
          <SearchBar
            onSearch={(query) => setSearchParams({ v: videoId, q: query })}
          />
          {query !== "" &&
            search !== undefined &&
            search.data !== undefined && <VideosList videos={search.data} />}
        </FlexBox>
      </FlexBox>
    )
  );
}
