import { Route } from "@tanstack/router";
import { rootRoute } from ".";

// Create an index route
export const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

function Home() {
  return <div>Home</div>;
}
