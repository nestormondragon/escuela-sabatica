import React from "react";
import Icon from "../../components/Icon.jsx";
import { useI18n } from "../../i18n/LocaleProvider.jsx";

export default function ReturnThread({ item, onResolve }) {
  const { t } = useI18n();
  if (!item) return null;

  return (
    <aside className="return-thread" aria-label={item.label}>
      <Icon name="refresh" size={16} />
      <div>
        <span>{item.label}</span>
        <p>{item.body}</p>
        {item.kind === "commitment" ? (
          <button type="button" onClick={() => onResolve?.(item.id)}>
            {t("today.didIt")}
          </button>
        ) : null}
      </div>
    </aside>
  );
}
