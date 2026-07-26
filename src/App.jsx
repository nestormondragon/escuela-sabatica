import React from "react";
import { RouterProvider } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { ToastProvider } from "./components/Toast.jsx";
import { JourneyProvider } from "./state/journey/index.js";
import { ArtifactProgressProvider } from "./features/artifact/ArtifactProgressContext.jsx";
import { router } from "./app/router.jsx";
import { LocaleProvider } from "./i18n/LocaleProvider.jsx";

export default function App() {
  return (
    <JourneyProvider>
      <LocaleProvider>
        <ArtifactProgressProvider>
          <ToastProvider>
            <ErrorBoundary>
              <RouterProvider router={router} />
            </ErrorBoundary>
          </ToastProvider>
        </ArtifactProgressProvider>
      </LocaleProvider>
    </JourneyProvider>
  );
}
