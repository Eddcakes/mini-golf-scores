import { Box } from "@chakra-ui/react";
import { Outlet, createFileRoute } from "@tanstack/react-router";

/* 
  routes prefixed with "_" become layout routes,
  everything in the _layouts dir will be wrapped by this 
*/

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <Box maxW={{ md: "40rem" }} margin={{ md: "auto" }}>
      <Outlet />
    </Box>
  );
}
