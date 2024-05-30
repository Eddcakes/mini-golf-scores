import { createLazyFileRoute } from "@tanstack/react-router";
import { Link } from "../../components/Link";
import { useTitle } from "../../hooks/useTitle";

export const Route = createLazyFileRoute("/_layout/about")({
  component: About,
});

function About() {
  useTitle("About");
  return (
    <div>
      This site uses your browsers local storage, so your data will only be
      available on this browser unless you <Link to="/settings">export</Link>{" "}
      your games
    </div>
  );
}