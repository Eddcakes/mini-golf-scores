import { Route } from "@tanstack/router";
import { rootRoute } from "./index";
import { ChartWrapper } from "../components/charts/Wrapper";

export const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

function About() {
  return <ChartWrapper />;
}
