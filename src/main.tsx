import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/router";
import { router } from "./pages";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
