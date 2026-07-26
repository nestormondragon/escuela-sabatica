import React, { useRef, useState } from "react";
import {
  journeyActions,
  selectors,
  useJourney,
} from "../state/journey/index.js";
import { useI18n } from "../i18n/LocaleProvider.jsx";

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
  const { locale, t } = useI18n();
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
    setNotice(t("settings.nameSaved"));
  };

  const exportAll = () => {
    const archive = journey.exportArchive();
    downloadText(
      typeof archive === "string" ? archive : JSON.stringify(archive, null, 2),
      locale === "en"
        ? "living-mosaic-corinth-backup.json"
        : "mosaico-vivo-corinto-respaldo.json"
    );
    setNotice(t("settings.downloaded"));
  };

  const importAll = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      journey.importArchive(text);
      setNotice(t("settings.imported"));
    } catch {
      setNotice(t("settings.invalidBackup"));
    } finally {
      event.target.value = "";
    }
  };

  const resetJourney = () => {
    if (
      window.confirm(
        t("settings.resetConfirm")
      )
    ) {
      journey.removeJourney({ includeBackup: false });
      setNotice(t("settings.resetDone"));
    }
  };

  return (
    <section className="settings-route" aria-labelledby="settings-title">
      <div className="route-eyebrow">{t("settings.eyebrow")}</div>
      <h1 id="settings-title" data-route-heading>{t("settings.title")}</h1>
      <p className="route-deck">{t("settings.storage")}</p>

      <div className="settings-strata">
        <section>
          <h2>{t("settings.companion")}</h2>
          <label className="setting-field" htmlFor="profile-name">
            <span>{t("settings.optionalName")}</span>
            <input
              id="profile-name"
              value={name}
              maxLength={32}
              autoComplete="given-name"
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <button type="button" className="btn btn-ghost" onClick={saveName}>
            {t("settings.saveName")}
          </button>
        </section>

        <section>
          <h2>{t("settings.appearance")}</h2>
          <div className="setting-choice">
            <span>{t("settings.language")}</span>
            <div role="group" aria-label={t("settings.language")}>
              {[
                ["es", t("settings.languageEs")],
                ["en", t("settings.languageEn")],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  lang={value}
                  aria-pressed={locale === value}
                  onClick={() =>
                    journey.dispatch(
                      journeyActions.setSettings({ locale: value })
                    )
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="setting-choice">
            <span>{t("settings.theme")}</span>
            <div role="group" aria-label={t("settings.theme")}>
              {[
                ["dark", t("settings.themeNight")],
                ["light", t("settings.themeDay")],
                ["auto", t("settings.themeSystem")],
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

          <div className="setting-choice">
            <span>{t("settings.textSize")}</span>
            <div role="group" aria-label={t("settings.textSize")}>
              {[
                ["normal", t("settings.textNormal")],
                ["large", t("settings.textLarge")],
                ["x-large", t("settings.textXLarge")],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={(settings.textSize || "normal") === value}
                  onClick={() =>
                    journey.dispatch(
                      journeyActions.setSettings({ textSize: value })
                    )
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <label className="setting-toggle">
            <span>
              <strong>{t("settings.reduceMotion")}</strong>
              <small>{t("settings.reduceMotionHelp")}</small>
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
              <strong>{t("settings.haptics")}</strong>
              <small>{t("settings.hapticsHelp")}</small>
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
          <h2>{t("settings.yourInfo")}</h2>
          <p>{t("settings.backupHelp")}</p>
          <div className="settings-actions">
            <button type="button" className="btn btn-primary" onClick={exportAll}>
              {t("settings.download")}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => inputRef.current?.click()}
            >
              {t("settings.import")}
            </button>
            <input
              ref={inputRef}
              className="sr-only"
              type="file"
              accept="application/json"
              aria-label={t("settings.selectBackup")}
              tabIndex={-1}
              onChange={importAll}
            />
          </div>
        </section>

        <section className="settings-danger">
          <h2>{t("settings.resetTitle")}</h2>
          <p>{t("settings.resetHelp")}</p>
          <button type="button" className="btn btn-ghost" onClick={resetJourney}>
            {t("settings.reset")}
          </button>
        </section>
      </div>

      <p className="settings-notice" role="status" aria-live="polite">
        {notice}
      </p>
    </section>
  );
}
