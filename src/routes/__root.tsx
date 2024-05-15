import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ThemeProvider } from "../context/Theme";
import { Header } from "../components/Header";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer></footer>
      <TanStackRouterDevtools />
    </ThemeProvider>
  ),
});
