import { createContext, useContext } from "react";

type Mode = "dark" | "light";

type Callback = (m: Mode) => Mode;

interface DarkModeContextShape {
  mode: Mode;
  setMode: (m: Mode | Callback) => any;
}

export const DarkModeContext = createContext<DarkModeContextShape>({
  mode: "dark",
  setMode: () => {},
});

function useDarkModeContext() {
  return useContext(DarkModeContext);
}

export default useDarkModeContext;
