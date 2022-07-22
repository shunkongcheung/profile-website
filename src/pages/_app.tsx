import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { DarkModeContext } from "../hooks/useDarkModeContext";
import { getTheme } from "../utils";

type Mode = "dark" | "light";

function MyApp({ Component, pageProps }) {
const [mode, setMode] = React.useState<Mode>("dark");
  const theme = getTheme(mode)

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
