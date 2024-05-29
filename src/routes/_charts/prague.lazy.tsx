import { createLazyFileRoute } from "@tanstack/react-router";
import { ChartWrapper } from "../../components/charts/Wrapper";

export const Route = createLazyFileRoute("/_charts/prague")({
  component: Prague,
});

function Prague() {
  return <ChartWrapper />;
}
