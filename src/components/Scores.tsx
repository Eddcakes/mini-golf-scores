import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { IData } from "../models/data";
import { splitIntoDatasets } from "../utils/data";
import { animation } from "../utils/animation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "hole 1",
  "hole 2",
  "hole 3",
  "hole 4",
  "hole 5",
  "hole 6",
  "hole 7",
  "hole 8",
  "hole 9",
  "hole 10",
  "hole 11",
  "hole 12",
  "hole 13",
  "hole 14",
  "hole 15",
  "hole 16",
  "hole 17",
  "hole 18",
];

const options = {
  responsive: true,
  animation,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Czech shitti golf",
    },
  },
};

export function Scores({ data }: IData) {
  const byHole = splitIntoDatasets(data, false);
  const cumulative = splitIntoDatasets(data, true);
  return (
    <>
      <Line
        options={options}
        data={{
          labels: labels,
          datasets: byHole,
        }}
      />
      <Line
        options={options}
        data={{
          labels: labels,
          datasets: cumulative,
        }}
      />
    </>
  );
}
