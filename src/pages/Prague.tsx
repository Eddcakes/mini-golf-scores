import { Route } from "@tanstack/router";
import { rootRoute } from "./index";
import { ChartWrapper } from "../components/charts/Wrapper";

export const pragueRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/prague",
  component: Prague,
});

function Prague() {
  return <ChartWrapper />;
}
