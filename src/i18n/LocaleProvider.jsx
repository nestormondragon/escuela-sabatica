import React, { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { parseISO } from "../lib/date.js";
import { useJourney } from "../state/journey/index.js";
import { normalizeLocale, translateMessage } from "./messages.js";

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const journey = useJourney();
  const locale = normalizeLocale(journey.state.settings.locale);

  const t = useCallback(
    (key, values) => {
      return translateMessage(locale, key, values);
    },
    [locale]
  );

  const formatLong = useCallback(
    (iso) => {
      const date = parseISO(iso);
      if (!date) return "";
      return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    },
    [locale]
  );

  const formatShort = useCallback(
    (iso) => {
      const date = parseISO(iso);
      if (!date) return "";
      return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es", {
        month: "short",
        day: "numeric",
      }).format(date);
    },
    [locale]
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, t, formatLong, formatShort }),
    [formatLong, formatShort, locale, t]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useI18n() {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error("useI18n must be used inside LocaleProvider");
  }
  return value;
}
