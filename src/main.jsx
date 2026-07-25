import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./fonts.css";
import "./index.css";
import "./app/app-shell.css";
import "./features/journey.css";
import "./features/world/world.css";
import "./features/mosaic/mosaic.css";
import "./features/sabbath/sabbath.css";
import "./routes/routes.css";

/* ?lab=<motif|all> opens the motif review harness instead of the app.
   Dev-only: import.meta.env.DEV is statically false in a production build,
   so the branch and the lab module are dropped at build time. */
const lab = import.meta.env.DEV
  ? new URLSearchParams(window.location.search).get("lab")
  : null;

async function boot() {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  if (lab) {
    const { default: MotifLab } = await import("./dev/MotifLab.jsx");
    const { JourneyProvider } = await import(
      "./state/journey/JourneyProvider.js"
    );
    root.render(
      <JourneyProvider>
        <MotifLab only={lab === "all" ? null : lab} />
      </JourneyProvider>
    );
    return;
  }
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

boot();
