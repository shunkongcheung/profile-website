import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { DarkModeContext } from "../hooks/useDarkModeContext";

type Mode = "dark" | "light";

function MyApp({ Component, pageProps }) {
  const [mode, setMode] = React.useState<Mode>("dark");
  const darkColors = {
    background: "#2d3e50",
    primary: {
      50: "#fff1f2",
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f20c73",
      600: "#e11d48",
      700: "#be123c",
      800: "#9f1239",
      900: "#881337",
    },
  };

  const lightColors = {
    background: "white",
    primary: {
      50: "#18181b",
      100: "#27272a",
      200: "#3f3f46",
      300: "#52525b",
      400: "#71717a",
      500: "#a1a1aa",
      600: "#d4d4d8",
      700: "#e4e4d7",
      800: "#f4f4f5",
      900: "#fafafa",
    },
  };

  const theme = {
    colors: mode === "dark" ? darkColors : lightColors,
    breakpoints: {
      sm: 600,
    },
  };

  const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  background: ${theme.colors.background};
}

a {
  color: inherit;
  text-decoration: none;

  margin-left: 1rem;
  color: ${theme.colors.primary[500]};

  &:hover {
    color: ${theme.colors.primary[600]};
    text-decoration: underline;
  }
}

* {
  box-sizing: border-box;
}
`;

  return (
    <>
      <GlobalStyle />
      <DarkModeContext.Provider value={{ mode, setMode }}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </DarkModeContext.Provider>
    </>
  );
}

export default MyApp;
