import { Route } from "@tanstack/router";
import { rootRoute } from "./index";

export const settingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: Settings,
});

function Settings() {
  return <div>settings</div>;
}
