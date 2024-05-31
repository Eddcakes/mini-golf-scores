import { createLazyFileRoute } from "@tanstack/react-router";
import { ChartWrapper } from "../../components/charts/Wrapper";
import { useTitle } from "../../hooks/useTitle";
import pragueScores from "../../assets/data.json";

export const Route = createLazyFileRoute("/_charts/prague")({
  component: Prague,
});

function Prague() {
  useTitle("Stats");
  return <ChartWrapper data={pragueScores} />;
}
