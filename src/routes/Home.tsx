import { useNavigate } from "react-router";
import { Box, FlexBox } from "@/components/Theme";
import { Logo } from "@/components/Logo";
import { SearchBar } from "@/components/SearchBar";

export function Home() {
  const navigate = useNavigate();

  function handleSearch(query: string) {
    navigate(`/results?q=${query}`);
  }

  return (
    <FlexBox $direction="column" $centered $flexGrow>
      <Box $position="relative">
        <Box $position="absolute" $transform="translateY(-100%)">
          <Logo />
        </Box>
        <SearchBar onSearch={handleSearch} />
      </Box>
    </FlexBox>
  );
}
