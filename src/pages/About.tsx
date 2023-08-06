import { Route } from "@tanstack/router";
import { rootRoute } from "./index";

export const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

function About() {
  return <div>Hello from About!</div>;
}
