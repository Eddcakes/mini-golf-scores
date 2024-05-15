import { createContext, useState } from "react";

export type ThemeType = "dark" | "regular";
export type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};
const DEFAULT_THEME = "regular";

export const defaultTheme = (): ThemeType => {
  if (localStorage.getItem("mg:theme")) {
    const newTheme =
      (localStorage.getItem("mg:theme") as ThemeType) ?? DEFAULT_THEME;
    return newTheme;
  }
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return DEFAULT_THEME;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme(),
  toggleTheme: () => {},
});

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme());
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "regular" : "dark";
    localStorage.setItem("mg:theme", newTheme);
    setTheme(newTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id="app" data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
