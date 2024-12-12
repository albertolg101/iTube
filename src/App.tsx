import { ThemeProvider } from "styled-components";
import { CustomTheme, GlobalStyle } from "@/libs/CustomTheme.ts";
import { Outlet } from "react-router";

export default function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <GlobalStyle />
      <Outlet />
    </ThemeProvider>
  );
}
