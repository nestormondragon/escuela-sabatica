import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_ROUTE_LABELS = {
  "/hoy": "Hoy",
  "/mosaico": "Mosaico del trimestre",
  "/sabado": "Preparación para el sábado",
};

function defaultRouteTitle(location) {
  if (DEFAULT_ROUTE_LABELS[location.pathname]) {
    return DEFAULT_ROUTE_LABELS[location.pathname];
  }
  if (location.pathname.startsWith("/leccion/")) {
    return "Recorrido de la lección";
  }
  return "Escuela Sabática";
}

/**
 * Announces route changes and places keyboard focus on the destination
 * heading. Mark the preferred heading with `data-route-heading`.
 */
export default function RouteAnnouncer({
  getRouteTitle = defaultRouteTitle,
}) {
  const location = useLocation();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const title = getRouteTitle(location);
    setAnnouncement(`${title}. Página cargada.`);
  }, [getRouteTitle, location]);

  return (
    <div
      className="mcv-visually-hidden"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {announcement}
    </div>
  );
}
