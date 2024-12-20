import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ErrorFallback from "./assets/ui/ErrorFallBack.jsx";
import { ErrorBoundary } from "react-error-boundary";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <App />
      </ErrorBoundary>
  </BrowserRouter>
);
