import { useNavigate } from "react-router";
import { Box, FlexBox } from "@/components/Theme";
import { Logo } from "@/components/Logo";
import { SearchBar } from "@/components/SearchBar";

export function Home() {
  const navigate = useNavigate();

  function handleSearch(query: string) {
    navigate(`/itube/results?q=${query}`);
  }

  return (
    <FlexBox
      $position="relative"
      $direction="column"
      $centered
      $flexGrow
      $fontSize="4rem"
    >
      <Box $position="absolute" $transform="translateY(-80%)">
        <Logo variant="horizontal" />
      </Box>
      <SearchBar onSearch={handleSearch} />
    </FlexBox>
  );
}
