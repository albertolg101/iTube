import { Box, FlexBox } from "@/components/Theme";
import { Logo } from "@/components/Logo";
import { SearchBar } from "@/components/SearchBar";

export function Home() {
  return (
    <FlexBox $direction="column" $centered $flexGrow>
      <Box $position="relative">
        <Box $position="absolute" $transform="translateY(-100%)">
          <Logo />
        </Box>
        <SearchBar />
      </Box>
    </FlexBox>
  );
}
