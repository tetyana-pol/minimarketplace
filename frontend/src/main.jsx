import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "./services/api.js";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiProvider api={api}>
      <App />
    </ApiProvider>
  </StrictMode>
);
