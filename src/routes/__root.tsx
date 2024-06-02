import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ThemeProvider } from "../context/Theme";
import { Header } from "../components/Header";
import { Box } from "@chakra-ui/react";

/* cant seem to get calc working for mb calc(var(--bottom-nav-height)+ 2rem) */

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <Header />
      <Box as="main" px={8} py={{ base: 4, md: 8 }} mb="5rem">
        <Outlet />
      </Box>
      <footer></footer>
      {/*  <TanStackRouterDevtools /> */}
    </ThemeProvider>
  ),
});
