/* =================================================================
   haptics.js — tiny tactile feedback wrapper.
   No-op where unsupported (iOS Safari ignores vibrate); never throws.
   ================================================================= */

let enabled = true;

export function setHaptics(on) {
  enabled = !!on;
}

export function tap(pattern = 8) {
  if (!enabled) return;
  try {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  } catch {
    /* ignore */
  }
}

export const buzz = {
  light: () => tap(8),
  medium: () => tap(16),
  success: () => tap([14, 40, 22]),
  soft: () => tap(5),
};
