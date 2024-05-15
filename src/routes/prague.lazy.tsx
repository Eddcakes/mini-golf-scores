import { createLazyFileRoute } from "@tanstack/react-router";
import { ChartWrapper } from "../components/charts/Wrapper";

export const Route = createLazyFileRoute("/prague")({
  component: Prague,
});

function Prague() {
  return <ChartWrapper />;
}
