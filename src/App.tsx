import { Scores } from "./components/Scores";
import data from "./assets/data.json";

function App() {
  return (
    <div>
      <header>by hole, also want cumulative scores</header>
      <Scores data={data} />
    </div>
  );
}

export default App;
