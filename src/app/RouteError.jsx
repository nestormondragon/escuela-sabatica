import React from "react";
import {
  Link,
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { useI18n } from "../i18n/LocaleProvider.jsx";

function errorCopy(error, t) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return {
      eyebrow: t("error.route404.eyebrow"),
      title: t("error.route404.title"),
      body: t("error.route404.body"),
    };
  }

  return {
    eyebrow: t("error.route.eyebrow"),
    title: t("error.route.title"),
    body: t("error.route.body"),
  };
}

/**
 * `errorElement` for the data router. It never clears local data.
 */
export default function RouteError() {
  const { t } = useI18n();
  const error = useRouteError();
  const copy = errorCopy(error, t);

  return (
    <main className="mcv-route-error" id="contenido-principal">
      <div className="mcv-route-error__mark" aria-hidden="true">
        <Icon name="mosaic" size={30} />
      </div>
      <p className="mcv-route-error__eyebrow">{copy.eyebrow}</p>
      <h1 data-route-heading>{copy.title}</h1>
      <p>{copy.body}</p>
      <div className="mcv-route-error__actions">
        <button type="button" onClick={() => window.location.reload()}>
          <Icon name="refresh" size={18} />
          {t("error.reload")}
        </button>
        <Link to="/hoy">
          <Icon name="arrowLeft" size={18} />
          {t("error.goToday")}
        </Link>
      </div>
      {import.meta.env.DEV && error instanceof Error ? (
        <details className="mcv-route-error__details">
          <summary>{t("error.technical")}</summary>
          <pre>{error.stack || error.message}</pre>
        </details>
      ) : null}
    </main>
  );
}
