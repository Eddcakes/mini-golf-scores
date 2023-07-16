import { useState } from "react";
import { Legend } from "./components/Legend";
import { Scores } from "./components/Scores";
import golfData from "./assets/data.json";

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

function App() {
  const data = golfData;
  const legendData = [...new Set(data.map((data) => data.name))];
  const [showing, setShowing] = useState<string[]>(legendData);
  const onChangeShowing = (name: string) => {
    const newShowingItems = showing.includes(name)
      ? showing.filter((item) => item !== name)
      : [...showing, name];
    setShowing(newShowingItems);
  };

  const chartData = data.filter((d) => showing.includes(d.name));
  return (
    <div>
      <header>header</header>
      <main>
        <Legend
          data={legendData}
          onChange={onChangeShowing}
          showing={showing}
        />
        <Scores data={chartData} />
      </main>
      <footer>something</footer>
    </div>
  );
}

export default App;
