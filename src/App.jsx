import React from "react";
import { RouterProvider } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { ToastProvider } from "./components/Toast.jsx";
import { JourneyProvider } from "./state/journey/index.js";
import { router } from "./app/router.jsx";

export default function App() {
  return (
    <JourneyProvider>
      <ToastProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ToastProvider>
    </JourneyProvider>
  );
}
