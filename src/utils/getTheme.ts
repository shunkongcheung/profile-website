type Mode = "dark" | "light";

const getTheme = (mode: Mode) => {
  const darkColors = {
    background: "#2d3e50",
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

  return theme;
}

export default getTheme
