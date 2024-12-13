import { useSearchParams } from "react-router";
import "@rmwc/circular-progress/styles";
import { CircularProgress } from "@rmwc/circular-progress";
import { FlexBox } from "@/components/Theme";
import { useVideoDetails } from "@/libs/youtube.ts";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { ErrorPage } from "@/components/ErrorPage";

export function Watch() {
  const [searchParams] = useSearchParams();

  const videoId = searchParams.get("v");

  const { data, isLoading, error } = useVideoDetails(videoId || "404");

  return error ? (
    <ErrorPage errorCode={500} />
  ) : data !== undefined && "status" in data ? (
    <ErrorPage errorCode={404} />
  ) : isLoading ? (
    <FlexBox $centered $flexGrow>
      <CircularProgress size="xlarge" />
    </FlexBox>
  ) : (
    videoId && data && <YouTubePlayer videoId={videoId} />
  );
}
