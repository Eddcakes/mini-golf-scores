import { createLazyFileRoute } from "@tanstack/react-router";
import { ChartWrapper } from "../../components/charts/Wrapper";
import { useTitle } from "../../hooks/useTitle";
import pragueScores from "../../assets/data.json";

export const Route = createLazyFileRoute("/_charts/prague")({
  component: Prague,
});

const mapColors = [
  { name: "MG", color: "#FABC2A" },
  { name: "RYAN", color: "#F05365" },
  { name: "MARC", color: "#880044" },
  { name: "JAMES", color: "#255C99" },
  { name: "MD", color: "#F8F272" },
  { name: "EDD", color: "#00CC99" },
  { name: "PAUL", color: "#C8963E" },
];

function Prague() {
  useTitle("Stats");
  return (
    <ChartWrapper
      data={pragueScores}
      shotLimitPerHole={10}
      totalHoles={18}
      playerList={mapColors}
    />
  );
}
