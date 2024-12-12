import { ThemeProvider } from "styled-components";
import { CustomTheme, GlobalStyle } from "@/libs/CustomTheme.ts";
import { Typography } from "@/components/Theme";

export default function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <GlobalStyle />
      <Typography as="h1" $weight="medium">
        Hello, World!
      </Typography>
    </ThemeProvider>
  );
}
