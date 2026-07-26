import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "../i18n/LocaleProvider.jsx";

/**
 * Announces route changes and places keyboard focus on the destination
 * heading. Mark the preferred heading with `data-route-heading`.
 */
export default function RouteAnnouncer({
  getRouteTitle,
}) {
  const { t } = useI18n();
  const location = useLocation();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const title = getRouteTitle?.(location) || t("app.name");
    setAnnouncement(t("route.loaded", { title }));
  }, [getRouteTitle, location, t]);

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
