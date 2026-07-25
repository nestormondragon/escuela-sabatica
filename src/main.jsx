import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

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
    root.render(<MotifLab only={lab === "all" ? null : lab} />);
    return;
  }
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

boot();
