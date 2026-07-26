import React from "react";
import { useI18n } from "../i18n/LocaleProvider.jsx";

export default function RouteLoading({ label }) {
  const { t } = useI18n();
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <span className="route-loading__stone" aria-hidden="true" />
      <span>{label || t("common.loadingLesson")}</span>
    </div>
  );
}
