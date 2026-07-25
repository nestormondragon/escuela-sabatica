import React from "react";
import {
  Link,
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";
import Icon from "../components/Icon.jsx";

function errorCopy(error) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return {
      eyebrow: "Ruta no encontrada",
      title: "Esta pieza no pertenece al mosaico.",
      body: "Puedes volver a Hoy sin perder lo que ya guardaste.",
    };
  }

  return {
    eyebrow: "Algo no encajó",
    title: "La superficie no pudo abrirse.",
    body: "Tus respuestas siguen guardadas en este dispositivo. Intenta cargarla de nuevo o vuelve a Hoy.",
  };
}

/**
 * `errorElement` for the data router. It never clears local data.
 */
export default function RouteError() {
  const error = useRouteError();
  const copy = errorCopy(error);

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
          Volver a cargar
        </button>
        <Link to="/hoy">
          <Icon name="arrowLeft" size={18} />
          Ir a Hoy
        </Link>
      </div>
      {import.meta.env.DEV && error instanceof Error ? (
        <details className="mcv-route-error__details">
          <summary>Detalle técnico</summary>
          <pre>{error.stack || error.message}</pre>
        </details>
      ) : null}
    </main>
  );
}
