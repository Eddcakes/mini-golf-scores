import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_charts")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div>
      <h1>Charts</h1>
      <Outlet />
    </div>
  );
}
