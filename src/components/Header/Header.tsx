import { Link } from "react-router";
import { Grid } from "@/components/Theme";
import { Logo } from "@/components/Logo";
import { SearchBar } from "@/components/SearchBar";
import { SearchBarProps } from "@/components/SearchBar/SearchBar.tsx";

export interface HeaderProps {
  searchParams: {
    onSearch: SearchBarProps["onSearch"];
    defaultValue: SearchBarProps["defaultValue"];
    isLoading: SearchBarProps["isLoading"];
  };
}

export function Header({ searchParams }: HeaderProps) {
  return (
    <Grid
      $width="100%"
      $gridTemplateColumns="1fr auto 1fr"
      $alignItems="center"
    >
      <Link to="/itube/">
        <Logo variant="horizontal" />
      </Link>
      <SearchBar {...searchParams} wide />
    </Grid>
  );
}
