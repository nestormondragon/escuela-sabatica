import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { useI18n } from "../i18n/LocaleProvider.jsx";

export const PRIMARY_DESTINATIONS = [
  { to: "/hoy", labelKey: "nav.today", icon: "spark" },
  { to: "/mosaico", labelKey: "nav.mosaic", icon: "mosaic" },
  { to: "/sabado", labelKey: "nav.sabbath", icon: "sunrise" },
];

/**
 * Primary navigation for the three durable product destinations.
 *
 * `variant="dock"` is intended for the mobile safe-area dock.
 * `variant="rail"` is intended for the desktop context rail.
 */
export default function PrimaryNav({
  variant = "dock",
  destinations = PRIMARY_DESTINATIONS,
  ariaLabel,
}) {
  const { t } = useI18n();
  return (
    <nav
      className={`mcv-primary-nav mcv-primary-nav--${variant}`}
      aria-label={ariaLabel || t("nav.primary")}
    >
      <ul className="mcv-primary-nav__list">
        {destinations.map((destination) => (
          <li key={destination.to}>
            <NavLink
              to={destination.to}
              end={destination.to === "/hoy"}
              className={({ isActive }) =>
                `mcv-primary-nav__link${isActive ? " is-active" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="mcv-primary-nav__marker" aria-hidden="true" />
                  <Icon
                    name={destination.icon}
                    size={variant === "dock" ? 22 : 20}
                    weight={isActive ? "fill" : "regular"}
                  />
                  <span>
                    {destination.labelKey
                      ? t(destination.labelKey)
                      : destination.label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
