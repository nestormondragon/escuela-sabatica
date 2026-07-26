import React from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { useI18n } from "../i18n/LocaleProvider.jsx";

export default function NotFoundRoute() {
  const { t } = useI18n();
  return (
    <section className="not-found-route" aria-labelledby="not-found-title">
      <Icon name="mosaic" size={38} />
      <div className="route-eyebrow">{t("notFound.eyebrow")}</div>
      <h1 id="not-found-title" data-route-heading>{t("notFound.title")}</h1>
      <p className="route-deck">{t("notFound.body")}</p>
      <Link className="btn btn-primary" to="/hoy">
        {t("error.goToday")}
      </Link>
    </section>
  );
}
