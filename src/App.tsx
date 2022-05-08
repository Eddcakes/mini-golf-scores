import { Scores } from "./components/Scores";

const testData = [
  { name: "MG", hole: 1, score: 2 },
  { name: "MG", hole: 2, score: 6 },
  { name: "MG", hole: 3, score: 2 },
  { name: "RYAN", hole: 1, score: 5 },
  { name: "RYAN", hole: 2, score: 3 },
  { name: "RYAN", hole: 3, score: 7 },
];

function App() {
  return (
    <div>
      <header>header</header>
      <main>
        <Scores data={testData} />
      </main>
      <footer>something</footer>
    </div>
  );
}

export default App;
