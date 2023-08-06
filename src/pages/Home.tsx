import { Route } from "@tanstack/router";
import { rootRoute } from ".";
import App from "../App";

// Create an index route
export const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

function Home() {
  return <App />;
}
