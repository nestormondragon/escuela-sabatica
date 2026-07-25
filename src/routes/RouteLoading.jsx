import React from "react";

export default function RouteLoading({ label = "Preparando la lección" }) {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <span className="route-loading__stone" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
