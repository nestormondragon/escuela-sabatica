import React, { useEffect, useRef } from "react";
import Icon from "../../components/Icon.jsx";

export default function IntentionalExit({ title = "Tu pieza queda aquí", body, onContinue, onClose }) {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section className="intentional-exit" aria-labelledby="intentional-exit-title">
      <div className="intentional-exit-mark" aria-hidden="true">
        <Icon name="mosaic" size={22} weight="fill" />
      </div>
      <p className="artifact-kicker">Pausa con intención</p>
      <h2
        ref={headingRef}
        id="intentional-exit-title"
        tabIndex={-1}
      >
        {title}
      </h2>
      <p>{body || "Puedes volver cuando quieras. El mosaico espera sin pedirte cuentas."}</p>
      <div className="intentional-exit-actions">
        {onContinue ? (
          <button type="button" className="btn btn-primary" onClick={onContinue}>
            Seguir un poco más
          </button>
        ) : null}
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Volver a Hoy
        </button>
      </div>
    </section>
  );
}
