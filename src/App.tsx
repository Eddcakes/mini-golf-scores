import { useRef, useState } from "react";
import { Legend } from "./components/charts/Legend";
import golfData from "./assets/data.json";
import { Header } from "./components/Header";
import useResizeObserver from "./hooks/useResizeObserver";
import { LineChart } from "./components/charts/LineChart";
import { Settings } from "./components/charts/Settings";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const testData = [
  { name: "MG", hole: 1, score: 2 },
  { name: "MG", hole: 2, score: 6 },
  { name: "MG", hole: 3, score: 2 },
  { name: "RYAN", hole: 1, score: 5 },
  { name: "RYAN", hole: 2, score: 3 },
  { name: "RYAN", hole: 3, score: 7 },
  { name: "PAUL", hole: 1, score: 2 },
  { name: "PAUL", hole: 2, score: 3 },
  { name: "PAUL", hole: 3, score: 4 },
];

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { height, width } = useResizeObserver(wrapperRef);
  const [theme, setTheme] = useState(defaultTheme);
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "regular" : "dark";
    localStorage.setItem("mg:theme", newTheme);
    setTheme(newTheme);
  };
  const data = golfData; // testData;
  const legendData = [...new Set(data.map((data) => data.name))];
  const [showing, setShowing] = useState<string[]>(legendData);
  const onChangeShowing = (name: string) => {
    const newShowingItems = showing.includes(name)
      ? showing.filter((item) => item !== name)
      : [...showing, name];
    setShowing(newShowingItems);
  };

  const toggleShowingAll = () => {
    if (showing.length > 0) {
      uncheckAll();
    } else {
      checkAll();
    }
  };
  const checkAll = () => {
    setShowing([...legendData]);
  };
  const uncheckAll = () => {
    setShowing([]);
  };

  const [cumulative, setCumulative] = useState(false);

  const chartData = data.filter((d) => showing.includes(d.name));

  return (
    <div id="app" data-theme={theme}>
      <Header toggleTheme={toggleTheme} />
      <main>
        <Legend
          data={legendData}
          onChange={onChangeShowing}
          showing={showing}
          toggleShowingAll={toggleShowingAll}
        />
        <div ref={wrapperRef} className="wrapper">
          <LineChart
            initialData={chartData}
            cumulative={cumulative}
            height={height}
            width={width}
          />
          <Settings
            wrapperRef={wrapperRef.current}
            height={height}
            width={width}
          />
        </div>
        <div id="portal-root"></div>
      </main>
      <footer>
        <label className="checkbox">
          <input
            type="checkbox"
            value={cumulative ? "overall score" : "by hole"}
            checked={cumulative}
            onChange={() => setCumulative(!cumulative)}
          />
          cumulative
        </label>
      </footer>
    </div>
  );
}

export default App;
