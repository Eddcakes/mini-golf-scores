import { Route } from "@tanstack/router";
import { rootRoute } from ".";
import { Link } from "../components/Link";

// Create an index route
export const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

/*
  check for in progress game
  if found, ask, want to go to current game > redirect
  else home page, 
  new game
  last game
  search
*/

function Home() {
  return (
    <div>
      <h1>New Game</h1>
      <Link to="/about" from="/">
        About
      </Link>
    </div>
  );
}
