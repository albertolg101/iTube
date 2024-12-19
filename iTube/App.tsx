import { ThemeProvider } from "styled-components";
import { CustomTheme, GlobalStyle } from "@/CustomTheme";
import { Outlet } from "react-router";

export default function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <GlobalStyle />
      <Outlet />
    </ThemeProvider>
  );
}
