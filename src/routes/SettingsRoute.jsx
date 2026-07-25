import React, { useRef, useState } from "react";
import {
  LOCAL_STORAGE_NOTICE,
  journeyActions,
  selectors,
  useJourney,
} from "../state/journey/index.js";

function downloadText(text, fileName, type = "application/json") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function SettingsRoute() {
  const journey = useJourney();
  const inputRef = useRef(null);
  const [name, setName] = useState(() => selectors.selectProfileName(journey.state));
  const [notice, setNotice] = useState("");
  const settings = journey.state.settings;

  const saveName = () => {
    journey.dispatch(
      journeyActions.setProfile({
        displayName: {
          value: name.trim(),
          privacy: "private",
          updatedAt: new Date().toISOString(),
        },
      })
    );
    setNotice("Nombre guardado en este navegador");
  };

  const exportAll = () => {
    const archive = journey.exportArchive();
    downloadText(
      typeof archive === "string" ? archive : JSON.stringify(archive, null, 2),
      "mosaico-vivo-corinto-respaldo.json"
    );
    setNotice("Respaldo descargado");
  };

  const importAll = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      journey.importArchive(text);
      setNotice("Respaldo importado");
    } catch {
      setNotice("Ese archivo no es un respaldo válido");
    } finally {
      event.target.value = "";
    }
  };

  const resetJourney = () => {
    if (
      window.confirm(
        "¿Borrar el recorrido nuevo de este trimestre? Las respuestas de la versión anterior se conservarán."
      )
    ) {
      journey.removeJourney({ includeBackup: false });
      setNotice("El recorrido nuevo fue reiniciado");
    }
  };

  return (
    <section className="settings-route" aria-labelledby="settings-title">
      <div className="route-eyebrow">Tu espacio</div>
      <h1 id="settings-title" data-route-heading>Ajustes y privacidad</h1>
      <p className="route-deck">{LOCAL_STORAGE_NOTICE}</p>

      <div className="settings-strata">
        <section>
          <h2>Cómo te acompaña</h2>
          <label className="setting-field" htmlFor="profile-name">
            <span>Nombre opcional</span>
            <input
              id="profile-name"
              value={name}
              maxLength={32}
              autoComplete="given-name"
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <button type="button" className="btn btn-ghost" onClick={saveName}>
            Guardar nombre
          </button>
        </section>

        <section>
          <h2>Apariencia y movimiento</h2>
          <div className="setting-choice">
            <span>Tema</span>
            <div role="group" aria-label="Tema">
              {[
                ["dark", "Noche"],
                ["light", "Día"],
                ["auto", "Sistema"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={settings.theme === value}
                  onClick={() =>
                    journey.dispatch(journeyActions.setSettings({ theme: value }))
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <label className="setting-toggle">
            <span>
              <strong>Reducir movimiento</strong>
              <small>Quita recorridos, partículas y profundidad</small>
            </span>
            <input
              type="checkbox"
              checked={settings.reducedMotion === true}
              onChange={(event) =>
                journey.dispatch(
                  journeyActions.setSettings({
                    reducedMotion: event.target.checked ? true : "system",
                  })
                )
              }
            />
          </label>

          <label className="setting-toggle">
            <span>
              <strong>Respuesta táctil</strong>
              <small>Una vibración breve al colocar una pieza</small>
            </span>
            <input
              type="checkbox"
              checked={settings.haptics}
              onChange={(event) =>
                journey.dispatch(
                  journeyActions.setSettings({ haptics: event.target.checked })
                )
              }
            />
          </label>
        </section>

        <section>
          <h2>Tu información</h2>
          <p>
            El respaldo incluye tus respuestas, compromisos y mosaico. No se
            envía a ningún servidor.
          </p>
          <div className="settings-actions">
            <button type="button" className="btn btn-primary" onClick={exportAll}>
              Descargar respaldo
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => inputRef.current?.click()}
            >
              Importar respaldo
            </button>
            <input
              ref={inputRef}
              className="sr-only"
              type="file"
              accept="application/json"
              aria-label="Seleccionar archivo de respaldo"
              tabIndex={-1}
              onChange={importAll}
            />
          </div>
        </section>

        <section className="settings-danger">
          <h2>Reiniciar el recorrido nuevo</h2>
          <p>
            Esta acción no elimina las claves antiguas. Un regreso a la versión
            anterior seguirá encontrando sus datos.
          </p>
          <button type="button" className="btn btn-ghost" onClick={resetJourney}>
            Reiniciar
          </button>
        </section>
      </div>

      <p className="settings-notice" role="status" aria-live="polite">
        {notice}
      </p>
    </section>
  );
}
