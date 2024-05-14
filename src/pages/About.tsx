import { Route } from "@tanstack/router";
import { rootRoute } from "./index";
import { Link } from "../components/Link";

export const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

function About() {
  return (
    <div>
      <div>
        This site uses your browsers local storage, so your data will only be
        available on this browser unless you <Link to="/settings">export</Link>{" "}
        your games
      </div>
    </div>
  );
}
