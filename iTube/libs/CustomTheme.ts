import { createGlobalStyle } from "styled-components";

export const CustomTheme = {
  font: {
    family: "Roboto, serif",
    sizes: {
      h1: "3em",
      h2: "2.5em",
      h3: "2em",
      h4: "1.5em",
      h5: "1.2em",
      h6: "1em",
      button: "1em",
      p: "1em",
      subtitle1: "0.8em",
      subtitle2: "0.6em",
      span: "inherit",
    },
    margin: {
      h1: "1em 0",
      h2: "0.8em 0",
      h3: "0.7em 0",
      h4: "0.5em 0",
      h5: "0.1em 0",
      h6: "0.3em 0",
      button: "0.2em 0.6em",
      p: "0.3em 0",
      subtitle1: "0.1em 0",
      subtitle2: "0.1em 0",
      span: "0",
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 600,
    },
  },
  palette: {
    primary: {
      light: "#00ce64",
      main: "#00b85a",
      dark: "#00a651",
    },
    secondary: {
      light: "#e0b0ff",
      main: "#cc99ff",
      dark: "#cc66ff",
    },
    text: {
      primary: "#171717",
      secondary: "#333333",
    },
    background: {
      body: "#F5F5F5",
      primary: "#FFFFFF",
      secondary: "#E0E0E0",
    },
  },
};

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: ${({ theme }) => theme.font.family};
        background-color: ${({ theme }) => theme.palette.background.body};
        scrollbar-color: ${({ theme }) =>
          `${theme.palette.primary.main} ${theme.palette.background.body}`};
        margin: 0;
    }
    
    #root {
        display: flex;
        width: 100vw;
        height: 100vh;
    }
`;
