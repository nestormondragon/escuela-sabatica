import React, { useEffect, useRef } from "react";
import Icon from "../../components/Icon.jsx";
import { useI18n } from "../../i18n/LocaleProvider.jsx";

export default function IntentionalExit({ title, body, onContinue, onClose }) {
  const { t } = useI18n();
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section className="intentional-exit" aria-labelledby="intentional-exit-title">
      <div className="intentional-exit-mark" aria-hidden="true">
        <Icon name="mosaic" size={22} weight="fill" />
      </div>
      <p className="artifact-kicker">{t("exit.kicker")}</p>
      <h2
        ref={headingRef}
        id="intentional-exit-title"
        tabIndex={-1}
      >
        {title || t("exit.defaultTitle")}
      </h2>
      <p>{body || t("exit.body")}</p>
      <div className="intentional-exit-actions">
        {onContinue ? (
          <button type="button" className="btn btn-primary" onClick={onContinue}>
            {t("exit.continue")}
          </button>
        ) : null}
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          {t("exit.today")}
        </button>
      </div>
    </section>
  );
}
