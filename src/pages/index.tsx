import { Outlet, Router, RootRoute } from "@tanstack/router";
import { aboutRoute } from "./About";
import { homeRoute } from "./Home";
import { useState } from "react";
import { Header } from "../components/Header";
import { ThemeContext, ThemeType, defaultTheme } from "../context/Theme";
import { pragueRoute } from "./Prague";
import { settingsRoute } from "./Settings";

// Create a root route
export const rootRoute = new RootRoute({
  component: Root,
});

function Root() {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme());
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "regular" : "dark";
    localStorage.setItem("mg:theme", newTheme);
    setTheme(newTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id="app" data-theme={theme}>
        <Header />
        <main>
          <Outlet />
        </main>
        <footer></footer>
      </div>
    </ThemeContext.Provider>
  );
}

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  pragueRoute,
  settingsRoute,
]);

// Create the router using your route tree
export const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}
