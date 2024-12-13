import { useSearchParams } from "react-router";
import { useSearch } from "@/libs/youtube.ts";
import { FlexBox } from "@/components/Theme";
import { SearchBar } from "@/components/SearchBar";
import { VideosList } from "@/components/VideosList";

export function Results() {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const query = searchParams.get("q") || "";
  const { data } = useSearch(query);

  function handleSearch(query: string) {
    setSearchParams({ q: query });
  }

  return (
    <FlexBox
      $direction="column"
      $alignItems="center"
      $flexGrow
      $fontSize="1rem"
      $padding="1rem 0"
    >
      <SearchBar onSearch={handleSearch} />
      {data !== undefined && <VideosList videos={data} />}
    </FlexBox>
  );
}
