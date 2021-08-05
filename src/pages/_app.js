import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: {
      50: "#fff1f2",
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
      800: "#9f1239",
      900: "#881337",
    },
  },
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
  background: #2d3e50;
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

const Container = styled.div`
  display: flex;
  padding: 1rem 3rem 1rem 3rem;

  min-height: 100vh;
`;

const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1050px;
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Container>
          <Content>
            <Component {...pageProps} />
          </Content>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
