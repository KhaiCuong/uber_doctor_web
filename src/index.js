import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { FilterProvider } from "context/FilterContext";
import ProtectRouter from "service/ProtectRouter";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
