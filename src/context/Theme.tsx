import { createContext, useState } from "react";
import { defaultTheme } from "./defaultTheme";

export type ThemeType = "dark" | "regular";
export type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};
export const DEFAULT_THEME = "regular";

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
