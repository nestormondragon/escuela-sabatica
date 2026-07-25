import React from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";

export default function NotFoundRoute() {
  return (
    <section className="not-found-route" aria-labelledby="not-found-title">
      <Icon name="mosaic" size={38} />
      <div className="route-eyebrow">Esta pieza no está aquí</div>
      <h1 id="not-found-title" data-route-heading>Volvamos al mosaico</h1>
      <p className="route-deck">
        La dirección no corresponde a una superficie de este trimestre.
      </p>
      <Link className="btn btn-primary" to="/hoy">
        Ir a Hoy
      </Link>
    </section>
  );
}
