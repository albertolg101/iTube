import type * as youtube from "@/libs/youtube.d";

export interface YouTubePlayerProps {
  videoId: youtube.VideosListItem["id"]["videoId"];
}

export function YouTubePlayer({ videoId }: YouTubePlayerProps) {
  const iFrameSrc = `https://www.youtube.com/embed/${videoId}`;
  const queryParams = new URLSearchParams({ autoplay: "1" });

  return (
    <iframe
      id="ytplayer"
      width="640"
      height="360"
      src={iFrameSrc + "?" + queryParams.toString()}
    ></iframe>
  );
}
