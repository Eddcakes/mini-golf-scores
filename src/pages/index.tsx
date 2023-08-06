import { Outlet, Link, Router, RootRoute } from "@tanstack/router";
import { aboutRoute } from "./About";
import { homeRoute } from "./Home";

// Create a root route
export const rootRoute = new RootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <div>
        <Link to="/">Home</Link> <Link to="/about">About</Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
}

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([homeRoute, aboutRoute]);

// Create the router using your route tree
export const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}
