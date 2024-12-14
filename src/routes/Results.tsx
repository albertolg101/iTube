import { useSearchParams, useNavigate } from "react-router";
import { useSearch } from "@/libs/youtube.ts";
import { FlexBox } from "@/components/Theme";
import { VideosList } from "@/components/VideosList";
import { Header } from "@/components/Header";

export function Results() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const query = searchParams.get("q") || "";
  const { data } = useSearch(query);

  function handleSearch(query: string) {
    setSearchParams({ q: query });
  }

  function handleVideoClick(videoId: string) {
    navigate(`/watch?v=${videoId}&q=${query}`);
  }

  return (
    <FlexBox
      $direction="column"
      $alignItems="center"
      $flexGrow
      $fontSize="2rem"
      $padding="1rem"
    >
      <Header searchParams={{ onSearch: handleSearch, defaultValue: query }} />
      {data !== undefined && (
        <VideosList videos={data} onVideoClick={handleVideoClick} />
      )}
    </FlexBox>
  );
}
