import { useState } from "react";
import { Header } from "./components/Header";
import { ChartWrapper } from "./components/charts/Wrapper";

const DEFAULT_THEME = "regular";

const defaultTheme = () => {
  if (localStorage.getItem("mg:theme")) {
    return localStorage.getItem("mg:theme");
  }
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return DEFAULT_THEME;
};

function App() {
  const [theme, setTheme] = useState(defaultTheme);
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "regular" : "dark";
    localStorage.setItem("mg:theme", newTheme);
    setTheme(newTheme);
  };
  return (
    <div id="app" data-theme={theme}>
      <Header toggleTheme={toggleTheme} />
      <main>
        <ChartWrapper />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
