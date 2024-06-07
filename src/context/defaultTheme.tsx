import { ThemeType, DEFAULT_THEME } from "./Theme";

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
