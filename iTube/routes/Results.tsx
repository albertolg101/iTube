import { useSearchParams } from "react-router";
import { useSearch } from "@/hooks/youtube";
import { FlexBox } from "@/components/Theme";
import { VideosList } from "@/components/VideosList";
import { Header } from "@/components/Header";

export function Results() {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const query = searchParams.get("q") || "";
  const { data, isLoading } = useSearch(query);

  function handleSearch(query: string) {
    setSearchParams({ q: query });
  }

  function getVideoUrl(videoId: string) {
    return `/watch?v=${videoId}&q=${query}`;
  }

  return (
    <FlexBox
      $direction="column"
      $alignItems="center"
      $flexGrow
      $fontSize="2rem"
      $padding="1rem"
      $overflow="hidden auto"
    >
      <Header
        searchParams={{
          onSearch: handleSearch,
          defaultValue: query,
          isLoading: isLoading,
        }}
      />
      {data !== undefined && (
        <VideosList videos={data} getVideoUrl={getVideoUrl} />
      )}
    </FlexBox>
  );
}
