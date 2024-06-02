import { createLazyFileRoute } from "@tanstack/react-router";
import { useTitle } from "../../hooks/useTitle";

export const Route = createLazyFileRoute("/_layout/settings")({
  component: Settings,
});

function Settings() {
  useTitle("Settings");
  return <div>settings</div>;
}
