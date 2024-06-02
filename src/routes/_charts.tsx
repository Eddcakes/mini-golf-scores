import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_charts")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
